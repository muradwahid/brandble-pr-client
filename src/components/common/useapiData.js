import { useCitiesQuery } from '../../redux/api/city';
import { useCountriesQuery } from '../../redux/api/country';
import { useDofollowsQuery } from '../../redux/api/dofollowApi';
import { useGenresQuery } from '../../redux/api/genreApi';
import { useIndexesQuery } from '../../redux/api/indexedApi';
import { useNichesQuery } from '../../redux/api/nicheApi';
import { useSponsorsQuery } from '../../redux/api/sponsoreApi';
import { useStatesQuery } from '../../redux/api/state';

export function useApiData() {
    const { data: nichesData, isLoading: nichesLoading } = useNichesQuery();
    const { data: genresData, isLoading: genresLoading } = useGenresQuery();
    const { data: indexesData, isLoading: indexesLoading } = useIndexesQuery();
    const { data: sponsorsData, isLoading: sponsorsLoading } = useSponsorsQuery();
    const { data: dofollowData, isLoading: dofollowLoading } = useDofollowsQuery();
    const { data: countries, isLoading: countriesLoading } = useCountriesQuery();
    const { data: states, isLoading: statesLoading } = useStatesQuery();
    const { data: cities, isLoading: citiesLoading } = useCitiesQuery();
    

    return { nichesData, nichesLoading, genresData, genresLoading, indexesData, indexesLoading, sponsorsData, sponsorsLoading, dofollowData, dofollowLoading, countries, countriesLoading, states, statesLoading, cities, citiesLoading };
}