import { useEffect, useState } from 'react';
import { search } from '../../API/search';
import { IMovie, IPersonSearch, ITV } from '../../types';
import { SearchType } from './HeaderSearch';
import { Link, useNavigate } from 'react-router-dom';
import noImg from './no-img.jpg';
import './search-result.scss';

interface SearchResultProps {
  searchType: SearchType;
  value: string;
  reset: (path: string) => void;
  onMouseLeave: () => void;
}

export type MediaType = 'person' | 'tv' | 'movie';

interface ResultItem {
  id: number;
  title: string;
  media_type?: MediaType
  img: string | null;
}

type MultiSearch = IMovie | ITV | IPersonSearch;

const convertToResultItem = (searchItem: MultiSearch, type: SearchType): ResultItem => {
  let result: ResultItem = {
    id: searchItem.id,
    title: `${searchItem?.title ? searchItem.title : searchItem.name}`,
    img: searchItem.poster_path || searchItem.profile_path || null
  }
  if (type === 'multi') {
    result.media_type = searchItem?.media_type
  } else {
    result.media_type = type as MediaType;
  }

  return result;
}


interface ResultItemsProps {
  item: ResultItem;
  reset: (path: string) => void;
}

const convertMediaType = (type: MediaType) => {
  if(type === 'person') {
    return 'name'
  } else {
    return type;
  }
}

const ResultItem = ({ item, reset }: ResultItemsProps) => {
  const { id, title, media_type, img } = item;

  const imgPath = (img: string | null | undefined) => img ? `https://image.tmdb.org/t/p/w300${img}` : noImg

  return (
    <div className='result-item' onClick={() => reset(`${convertMediaType(media_type as MediaType)}/${id}`)}>
      <div className="img-wrap">
        <img src={imgPath(img)} alt="" />
      </div>
      <div>
        <h2>{title}</h2>
        <p>Search category :  <span>{`"${media_type}"`}</span></p>
      </div>
    </div>
  )
}

const SearchResult = (props: SearchResultProps) => {
  const { searchType, value, reset, onMouseLeave } = props;
  const [result, setResult] = useState<ResultItem[]>([])

  useEffect(() => {
    (async () => {
      const res = await search(searchType, value);
      const data = res.map(item => convertToResultItem(item, searchType));
      setResult(data.filter(item => item.img));
    })()
  }, [value, searchType])

  return (
    <div className='search-result-wrap' onMouseLeave={onMouseLeave}>
      {result.map(item => <ResultItem item={item} reset={reset} key={item.id} />)}
    </div>
  );
}

export { SearchResult }