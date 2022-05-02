import styled from "styled-components";
import { DefaultInput, DefaultSelect, FormInputContainer } from ".";

export function Input(props){
    return(
        <FormInputContainer hidden={props.hidden} before={props.before}>
            <DefaultInput before={props.before} value={props.value} autoFocus={props.autoFocus} onChange={props.onChange} onInput={props.onInput} type={props.type} name={props.name} autocomplete={props.autocomplete} placeholder={props.placeholder}/>
        </FormInputContainer>
    )
}

const BirtdaySelectContainer = styled(FormInputContainer)`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
`

const Months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function Select(props){
    return(
        <FormInputContainer hidden={props.hidden}>
            <DefaultSelect name={props.name} onChange={props.onChange}>{props.children}</DefaultSelect>
        </FormInputContainer>
    )
}

export function BirthdaySelect(props){
    let year = (new Date()).getFullYear();
    return (
        <BirtdaySelectContainer>
            <DefaultSelect width="75px" flex="0 0 auto" onChange={(e) => props.setValues({...props.values, bDay: e.target.value})}>
                <option selected disabled>Dia</option>
                {[...Array(30).keys()].map(item => <option value={item+1} key={item}>{item+1}</option>)}
            </DefaultSelect>
            <DefaultSelect flex="0 1 auto" margin="0px 5px" onChange={(e) => props.setValues({...props.values, bMonth: e.target.value})}>
                <option selected disabled>Mês</option>
                {Object.entries(Months).map(([key, value]) => <option value={key} key={key}>{value}</option>)}
            </DefaultSelect>
            <DefaultSelect width="85px" flex="0 0 auto" onChange={(e) => props.setValues({...props.values, bYear: e.target.value})}>
                <option selected disabled>Ano</option>
                {[...Array(150).keys()].map(item => <option value={year - item} key={item}>{year - item}</option>)}
            </DefaultSelect>
        </BirtdaySelectContainer>
    )
}