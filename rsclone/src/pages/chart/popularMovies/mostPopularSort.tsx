import { Sort } from '../sort/sort';
import { MostPopularSortState } from '../../../models/IMDBModels';

import './mostPopularMovies.scss';

export const MostPopularSort = (props: MostPopularSortState) => {    

    return (
        <div className='mostPopular__sort'>
            <div className='mostPopular__sort_header'>Showing 100 Titles</div>
            <Sort item={props} />
        </div>
    )
}