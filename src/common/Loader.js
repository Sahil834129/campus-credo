import { useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getLoading, setLoading} from '../redux/actions/loaderAction';

const LoaderContainer = styled.div`
        display: none; 
        position: fixed; 
        z-index: 999;
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgb(0, 0, 0); 
        background-color: rgba(0, 0, 0, 0.4); 
        ${props =>
            props.visible &&
            css`display: block;`
        }
    `;
const Loader = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.loaderData.loading);
    LoadingOverlay.propTypes = undefined;
    useEffect(() => {dispatch(getLoading())}, [dispatch]);

    return (
        <LoaderContainer visible={isLoading}>
            <LoadingOverlay active={true} spinner></LoadingOverlay>
        </LoaderContainer>
    )
}

export const showLoader = (dispatch) => {
    dispatch(setLoading(true));
}

export const hideLoader = (dispatch) => {
    dispatch(setLoading(false));
}

export default Loader;
