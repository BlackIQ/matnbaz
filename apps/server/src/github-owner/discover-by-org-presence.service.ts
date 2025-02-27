import { Injectable, Logger } from '@nestjs/common';
import { OwnerType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OctokitService } from '../octokit/octokit.service';
import { OwnerReason } from '../owner/constants';
import { GithubOwnerService } from './github-owner.service';

@Injectable()
export class GithubDiscoverByOrgPresenceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService,
    private readonly githubOwnerService: GithubOwnerService
  ) {}
  private logger = new Logger(GithubDiscoverByOrgPresenceService.name);

  async discover() {
    this.logger.log(
      `Starting the discovery process based on organization membership`
    );

    const organizations = await this.prisma.owner.findMany({
      where: {
        type: OwnerType.Organization,
        blockedAt: null,
      },
    });

    for (const org of organizations) {
      const response = await this.octokit.rest.orgs.listPublicMembers({
        org: org.login,
        per_page: 100,
        sort: 'followers',
        request: { timeout: 10000 },
      });
      const owners = response.data;

      for (const org of owners)
        await this.githubOwnerService.populateOwner(
          org,
          OwnerReason.ORGANIZATION_PRESENCE
        );
    }
    this.logger.log(
      `Discovered all public members of all ${organizations.length} organizations`
    );
  }
}
