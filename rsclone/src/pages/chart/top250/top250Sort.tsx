import { Sort } from '../sort/sort';
import { MostPopularSortState } from '../../../models/IMDBModels';

import '../popularMovies/mostPopularMovies.scss';

export const SortTop250 = (props: MostPopularSortState) => {    

    return (
        <div className='mostPopular__sort'>
            <div className='mostPopular__sort_header'>Showing 250 Titles</div>
            <Sort item={props} />
        </div>
    )
}