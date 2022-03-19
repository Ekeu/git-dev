import React from 'react';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import algoliasearch from 'algoliasearch';
import { getAlgoliaResults } from '@algolia/autocomplete-js';

import AlgoliaAutocomplete from '../algolia/algolia-autocomplete';
import AlgoliaItem from '../algolia/algolia-item';
import { useRouter } from 'next/router';
import AlgoliaSVG from '../algolia/algolia-svg';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'NAV_RECENT_SEARCH',
  limit: 6,
  transformSource({ source }) {
    return {
      ...source,
      templates: {
        ...source.templates,
      },
    };
  },
});
const Search = () => {
  const router = useRouter();
  return (
    <AlgoliaAutocomplete
      openOnFocus={true}
      placeholder={'Search gitdev'}
      detachedMediaQuery={'none'}
      classNames={{
        root: '!text-slate-800 sm:!text-sm !font-hind !max-w-lg !w-full lg:!max-w-md !leading-normal',
        form: '!border !border-transparent !bg-violet-700 focus-within:!bg-slate-100 !rounded-md focus-within:!shadow-none focus-within:!outline-none',
        inputWrapper: '!relative',
        input:
          '!block !w-full !border !border-transparent !rounded-md !leading-5 !text-slate-300 !placeholder-violet-400 focus-within:!outline-none focus-within:!bg-slate-100 focus-within:!border-slate-100 focus-within:!ring-slate-100 focus-within:!text-slate-800 sm:!text-md',
        panel: '!z-10',
        list: 'divide-y divide-slate-200',
        clearButton: '!text-violet-500 hover:!text-violet-600',
        sourceFooter:
          'flex flex-none justify-end border-t border-slate-200 px-2',
        panelLayout:
          'scrollbar-w-2 scrollbar-track-blue-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-blue-gray scrolling-touch',
      }}
      plugins={[recentSearchesPlugin]}
      getSources={({ query, state }) => {
        if (!query) {
          return [];
        }

        return [
          {
            sourceId: 'profiles',
            getItemUrl({ item }) {
              return `/${item.username}`;
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'users',
                    query,
                    params: {
                      hitsPerPage: 8,
                      attributesToHighlight: ['user.name'],
                      attributesToHighlight: ['user.name'],
                      snippetEllipsisText: '...',
                    },
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return (
                  <AlgoliaItem
                    router={router}
                    item={item}
                    components={components}
                  />
                );
              },
              footer() {
                return (
                  <div>
                    <a
                      href='https://www.algolia.com/docsearch'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center text-xs font-medium font-inter tracking-tight text-slate-500'
                    >
                      <span>Search by</span>
                      <AlgoliaSVG className={'ml-1 h-14 w-14'} />
                    </a>
                  </div>
                );
              },
              noResults() {
                return (
                  <p className={'text-center text-slate-400 text-sm font-hind'}>
                    {' '}
                    No results for{' '}
                    <strong
                      className={'font-medium text-slate-800'}
                    >{`"${query}"`}</strong>
                  </p>
                );
              },
            },
          },
        ];
      }}
    />
  );
};

export default Search;
