import classNames from 'classnames';
import { useMemo } from 'react';
import {
  AiOutlineBranches,
  AiOutlineExclamationCircle,
  AiOutlineStar,
} from 'react-icons/ai';
import { GetRepositoriesQuery } from '../../lib/graphql-types';
import OwnerImage from '../Owner/OwnerImage';
import Card from '../UI/Card';
interface IRepositoryPreviewProps {
  repository: GetRepositoriesQuery['repositories']['edges'][0]['node'];
}
const RepositoryPreview = ({ repository }: IRepositoryPreviewProps) => {
  const statistics = useMemo(
    () => [
      {
        name: 'تعداد مشکلات',
        icon: AiOutlineExclamationCircle,
        value: +repository.openIssuesCount,
      },
      {
        name: 'فورک‌ها',
        icon: AiOutlineBranches,
        value: +repository.forksCount,
      },
      {
        name: 'ستاره‌ها',
        icon: AiOutlineStar,
        value: +repository.stargazersCount,
      },
    ],
    [repository]
  );

  const hasStatistics = useMemo(
    () =>
      statistics.every(
        (statistic) =>
          statistic.value !== null &&
          statistic.value !== undefined &&
          !isNaN(statistic.value)
      ),
    [statistics]
  );

  return (
    <Card padded href={`/github/${repository.fullName}`}>
      <div className="relative h-full">
        {/* Platform Logo */}
        {/* <img
          className="w-4 h-4 absolute opacity-10"
          style={{ filter: 'invert(1)' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
        /> */}
        {repository.isNew && (
          <span className="px-1.5 py-0.5 bg-primary-500/30 backdrop-blur-sm rounded-full absolute text-sm z-20 -mr-3 -mt-6">
            جدید
          </span>
        )}
        <div
          className={classNames(
            'flex flex-col md:flex-row md:space-x-3 items-start space-y-2',
            hasStatistics && 'pb-4 md:pb-12'
          )}
          dir="ltr"
        >
          {repository.owner && (
            <div>
              <OwnerImage owner={repository.owner} />
            </div>
          )}
          <div className="flex flex-col space-y-2 h-full w-full text-left overflow-hidden">
            <div className="text-xl text-primary-600 dark:text-primary-400">
              {repository.fullName}
            </div>

            <span className="text-gray-800 dark:text-gray-300 font-extralight text-sm">
              {repository.descriptionLimited}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center md:absolute bottom-0 w-full mt-2 md:mt-0">
          {repository.language && (
            <div className="flex items-center">
              <>
                {/* // Dir set to ltr to avoid displaying languages like C# as #C */}
                <span className="pl-1.5 py-1.5 text-sm" dir="ltr">
                  {repository.language.name}
                </span>
                <div
                  className="rounded-full w-2 h-2"
                  style={{ backgroundColor: repository.language.color }}
                />
              </>
            </div>
          )}

          <div className="flex flex-col sm:flex-row space-x-6 space-y-3 sm:space-y-0 space-x-reverse mr-auto">
            {hasStatistics &&
              statistics.map((statistic) => (
                <div
                  key={statistic.name}
                  className="flex space-x-1 space-x-reverse text-gray-700 dark:text-gray-400 items-center justify-end text-sm sm:text-base"
                >
                  <span>{statistic.value.toLocaleString('fa')}</span>
                  <statistic.icon className="w-4 h-4 md:w-5 md:h-5 m-auto" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RepositoryPreview;
