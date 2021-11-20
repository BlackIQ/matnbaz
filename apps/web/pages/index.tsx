import Card from '../components/UI/Card';

import { useGetRepositoriesQuery } from '../graphql-types';
import RepositoryPreviewSkeletonLoader from '../components/Skeleton Loaders/RepositoryPreviewSkeletonLoader';

import RepositoryPreviewList from '../components/Repository/RepositoryPreviewList';
import MainLayout from '../components/Layouts/MainLayout';

export function Index() {
  const { loading, data, fetchMore } = useGetRepositoriesQuery();
  const repositories = data?.repositories.edges;
  const repositoriesPageInfo = data?.repositories.pageInfo;
  const repositoriesLoadMoreHandler = () => {
    if (!repositoriesPageInfo.hasNextPage) return;
    fetchMore({
      variables: {
        after: repositoriesPageInfo.endCursor,
      },
    });
  };
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-5 px-6 gap-y-6 gap-x-0 md:gap-x-6">
        <div>
          <Card>TODO</Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-0 md:gap-x-6 md:col-span-4">
          {loading ? (
            <>
              {[...Array(6).keys()].map((number) => (
                <RepositoryPreviewSkeletonLoader key={number} />
              ))}
            </>
          ) : data.repositories.edges.length ? (
            <RepositoryPreviewList
              repositories={repositories}
              onLoadMore={repositoriesLoadMoreHandler}
            />
          ) : (
            <div>
              <h1 className="text-2xl font-semibold mb-4">
                نتیجه ای یافت نشد.
              </h1>
              <span>هیچ نتیجه ای با فیلتر های وارد شده یافت نشد.</span>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Index;
