
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import {fetchFilters} from '../../actions';
import { activeFilterChanged } from './filtersSlice';

import Spinner from '../spinner/Spinner';



const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {  
        dispatch(fetchFilters(request));
        // request("http://localhost:3001/filters")
        //     .then(data => dispatch(filtersFetched(data)))
        //     .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);


    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }


    const renderFiltersList = (arr) => { 

        if (arr.length > 0) {
            return arr.map(({name, label, className}) => {
                console.log(activeFilter);

                const btnClass = classNames('btn', className, {
                    'active': name === activeFilter
                });

                return <button 
                key={name} 
                id={name} 
                className={btnClass}
                onClick={() => dispatch(activeFilterChanged(name))}
                >{label}</button>
            })
        }

        
    }

    const elements = renderFiltersList(filters);


 

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;