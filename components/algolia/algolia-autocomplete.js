import React, { useEffect, useRef, createElement, Fragment } from 'react';
import { autocomplete } from '@algolia/autocomplete-js';
import { render } from 'react-dom';

const AlgoliaAutocomplete = (props) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: {
        createElement,
        Fragment,
      },
      render({ children }, root) {
        render(children, root);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);
  return (
    <div
      ref={containerRef}
      id='search-container'
      className={'flex-1 flex justify-center px-2 lg:justify-start lg:ml-2'}
    ></div>
  );
};

export default AlgoliaAutocomplete;
