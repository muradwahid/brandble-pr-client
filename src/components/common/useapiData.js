import { useDofollowsQuery } from '../../redux/api/dofollowApi';
import { useGenresQuery } from '../../redux/api/genreApi';
import { useIndexesQuery } from '../../redux/api/indexedApi';
import { useNichesQuery } from '../../redux/api/nicheApi';
import { useSponsorsQuery } from '../../redux/api/sponsoreApi';

export function useApiData() {
    const { data: nichesData, isLoading: nichesLoading } = useNichesQuery();
    const { data: genresData, isLoading: genresLoading } = useGenresQuery();
    const { data: indexesData, isLoading: indexesLoading } = useIndexesQuery();
    const { data: sponsorsData, isLoading: sponsorsLoading } = useSponsorsQuery();
    const { data: dofollowData, isLoading: dofollowLoading } = useDofollowsQuery();
    

    return { nichesData, nichesLoading, genresData, genresLoading,indexesData,indexesLoading,sponsorsData,sponsorsLoading,dofollowData,dofollowLoading };
}