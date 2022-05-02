import { useEffect, useRef, useState } from 'react';
import { ContentContainer, ContinueButton, FormContainer, FormCall, DisplayText, Form, OverflowFormContainer, FormReturnMessage } from '../../components/login';
import { BirthdaySelect, Input, Select } from '../../components/login/input';
import Menu from '../../components/login/menu';

export default function SignUp(){
    const [overflowLeft, setOverflowLeft] = useState({old: 0, current: 0});
    const [values, setValues] = useState({name: '', mail: ''});
    const overflow = useRef();

    function SetPosition(left){
        setOverflowLeft({...overflowLeft, current: left});
    }

    useEffect(() => {
        if(overflowLeft.old !== overflowLeft.current){
            overflow.current.scrollTo({top: 0, left: overflowLeft.current, behavior: 'smooth'});
            setOverflowLeft({...overflowLeft, old: overflowLeft.current})
        }
    }, [overflowLeft])

    return (
        <ContentContainer>
            <Menu />
            <OverflowFormContainer ref={overflow}>
                <FirstForm setPosition={SetPosition} setValues={setValues} values={values} />
                <SecondForm setPosition={SetPosition} setValues={setValues} values={values} />
                <ThirdForm />
            </OverflowFormContainer>
        </ContentContainer>
    )
}


function FirstForm(props){
    const [formValues, setFormValues] = useState({name: '', mail: '', bDay: '', bMonth: '', bYear: '', gender: '', invite: ''});
    const [formError, setFormError] = useState('');
    const [formDisabled, setFormDisabled] = useState(false);

    function formSubmit(event){
        event.preventDefault();
        event.stopPropagation();

        if(!formValues.name) return setFormError('Nome não pode estar vazio!');
        if(!formValues.mail) return setFormError('E-Mail não pode estar vazio!');
        if(!formValues.bDay) return setFormError('Dia de nascimento deve ser selecionado!');
        if(!formValues.bMonth) return setFormError('Mês de nascimento deve ser selecionado!');
        if(!formValues.bYear) return setFormError('Ano de nascimento deve ser selecionado!');
        if(!formValues.gender) return setFormError('Gênero deve ser selecionado!');
        if(!formValues.invite) return setFormError('Código de convite não pode estar vazio!');

        let body = new FormData();
        body.append('name', formValues.name);
        body.append('mail', formValues.mail);
        body.append('birth-day', formValues.bDay);
        body.append('birth-month', formValues.bMonth);
        body.append('birth-year', formValues.bYear);
        body.append('gender', formValues.gender);
        body.append('invite', formValues.invite);

        setFormError('');
        setFormDisabled(true);

        fetch("https://thidle.com/api/v0/login/create/signup", {method: "POST", body})
        .then((response)=>{return response.json();})
        .then((result)=>{
            if(result.success){
                props.setPosition(350);
                props.setValues({...props.values, name: formValues.name, mail: formValues.mail});
            } else {
                setFormDisabled(false);
                setFormError(result.error);
            }
        });
    }

    return (
        <FormContainer isOverflow>
            <FormCall>
                <DisplayText color="white" fontSize="14pt" center bold lessBottom>Criar uma conta Thidle</DisplayText>
                <DisplayText color="white" fontSize="9pt" center>Junte-se às pessoas que pensam</DisplayText>
            </FormCall>
            <Form onSubmit={formSubmit} disabled={formDisabled}>
                <FormReturnMessage>{formError}</FormReturnMessage>
                <Input name="name" value={formValues.name} onChange={(e) => {setFormValues({...formValues, name: e.target.value.substr(0, 75)})}} type="text" placeholder="Qual é o seu Nome?"/>
                <Input name="mail" value={formValues.mail} onChange={(e) => {setFormValues({...formValues, mail: e.target.value.substr(0, 321)})}} type="email" placeholder="Qual é o seu E-Mail?"/>
                <DisplayText fontSize='9pt' hasTop middle>Quando você nasceu?</DisplayText>
                <BirthdaySelect values={formValues} setValues={setFormValues}/>
                <Select onChange={(e) => {setFormValues({...formValues, gender: e.target.value})}}>
                    <option value="D" selected disabled>Selecione seu gênero</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="T">Transgênero</option>
                    <option value="O">Outro</option>
                    <option value="N">Não Informar</option>
                </Select>
                <DisplayText fontSize='9pt' hasTop middle>Para criar uma conta no Thidle, você deve ter um código de convite de alguém que já está usando o Thidle.</DisplayText>
                <Input value={formValues.invite} onChange={(e) => {setFormValues({...formValues, invite: e.target.value.substr(0, 15)})}} name="invite" type="text" placeholder="Digite aqui o seu código de convite"/>
                <ContinueButton marginTop='20px'>Continuar</ContinueButton>
            </Form>
        </FormContainer>
    )
}


function SecondForm(props){
    const [confirm, setConfirm] = useState('');
    const [formError, setFormError] = useState('');
    const [formDisabled, setFormDisabled] = useState(false);

    function formSubmit(event){
        event.preventDefault();
        event.stopPropagation();

        setFormError('');
        setFormDisabled(true);


        let body = new FormData();
        body.append('confirm-code', confirm);

        fetch("https://thidle.com/api/v0/login/create/confirm", {method: "POST", body})
        .then((response)=>{return response.json();})
        .then((result)=>{
            if(result.success){
                props.setPosition(700);
            } else {
                setFormDisabled(false);
                setFormError(result.error);
            }
        });
    }

    return (
        <FormContainer isOverflow>
            <FormCall>
                <DisplayText color="white" fontSize="11pt" center bold lessBottom>Olá {props.values.name.split(' ')[0].substr(0, 1).toUpperCase()+props.values.name.split(' ')[0].substr(1).toLowerCase()}, legal ver você por aqui!</DisplayText>
                <DisplayText color="white" fontSize="9pt" center>Por favor, digite o codigo que foi enviado para o seu E-mail: <span style={{color: '#C55A11'}}>{props.values.mail}</span></DisplayText>
            </FormCall>
            <Form onSubmit={formSubmit} disabled={formDisabled}>
                <FormReturnMessage>{formError}</FormReturnMessage>
                <Input name="confirm" value={confirm} onKeyDown={(e) => {if(e.which === 32) e.preventDefault()}} onInput={(e) => setConfirm(e.target.value.toUpperCase().substr(0, 6))} type="text" placeholder="XXXXXX"/>
                <ContinueButton marginTop='20px'>Continuar</ContinueButton>
            </Form>
        </FormContainer>
    )
}


var tOut = null;
function ThirdForm(props){
    const [formError, setFormError] = useState('');
    const [formDisabled, setFormDisabled] = useState(false);
    const [usernameStatus, setUsernameStatus] = useState('Junte-se às pessoas que pensam');
    const [passwordStatus, setPasswordStatus] = useState('Junte-se às pessoas que pensam');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState({first: '', second: ''});

    function ValidatePassword(value, revalue){
        let passChars = value.split('');
        let validated = {upper: false, lower: false, number: false, other: false};

        let ValidUpperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let ValidLowerLetters = 'abcdefghijklmnopqrstuvwxyz';
        let ValidNumbers = '0123456789';

        passChars.forEach(item => {
            if(ValidUpperLetters.indexOf(item) !== -1) validated.upper = true;
            else if(ValidLowerLetters.indexOf(item) !== -1) validated.lower = true;
            else if(ValidNumbers.indexOf(item) !== -1) validated.number = true;
            else validated.other = true;
        });

        if(!(validated.upper && validated.lower && validated.number && validated.other && value.length >= 8 && value === revalue)){
            let text = [
                <div style={{color: 'white', marginBottom: '5px'}}>A sua senha deve:</div>,
                <div style={{color: value.length >= 8 ? 'green' : 'red'}}>Ter pelo menos 8 caracteres</div>,
                <div style={{color: validated.upper ? 'green' : 'red'}}>Ter pelo menos uma letra maiúscula</div>,
                <div style={{color: validated.lower ? 'green' : 'red'}}>Ter pelo menos uma letra minúscula</div>,
                <div style={{color: validated.number ? 'green' : 'red'}}>Ter pelo menos um número</div>,
                <div style={{color: validated.other ? 'green' : 'red'}}>Ter pelo menos uma caractere especial</div>,
                <div style={{color: value === revalue ? 'green' : 'red'}}>As duas senhas devem ser iguais</div>
            ]

            setPasswordStatus(text);
            return false;
        }

        setPasswordStatus('Senha válida!');
        return true;
    }

    async function ValidateUsername(value, instant = false){
        clearTimeout(tOut);
        
        if(value.length < 3){
            setUsernameStatus('Seu usuário deve ter no mínimo 3 caracteres');
            return false;
        }

        return new Promise(resolve => {
            tOut = setTimeout(() => fetch("https://thidle.com/api/v0/login/create/checkUsername?username="+value)
            .then((response)=>{return response.json();})
            .then((result)=>{
                if(result.success) setUsernameStatus('Nome de usuário disponível')
                else setUsernameStatus('Este nome de usuário está indisponível');
                resolve(result.success ?? true)
            }), instant ? 0 : 250);
        });
    }

    async function formSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        
        if(!(await ValidateUsername(username) && ValidatePassword(password.first, password.second))) return;

        setFormError('');
        setFormDisabled(true);

        let body = new FormData();
        body.append('username', username);
        body.append('password', password.first);
        body.append('re-password', password.second);

        fetch("https://thidle.com/api/v0/login/create/finish", {method: "POST", body})
        .then((response)=>{return response.json();})
        .then((result)=>{
            if(result.success){
                window.location.href = result.redirect;
            } else {
                setFormDisabled(false);
                setFormError(result.error);
            }
        });
    }

    return (
        <FormContainer isOverflow>
            <FormCall>
                <DisplayText color="white" fontSize="11pt" center bold lessBottom>Complete a sua conta</DisplayText>
            </FormCall>
            <Form onSubmit={formSubmit} disabled={formDisabled}>
                <FormReturnMessage>{formError}</FormReturnMessage>

                <DisplayText fontSize="9pt" hasTop middle>Escolha um nome de usuário</DisplayText>
                <Input name="username" before="@" value={username} onKeyDown={(e) => {if(e.which === 32) e.preventDefault()}} onChange={(e) => {setUsername(e.target.value.toLowerCase().substr(0, 35)); ValidateUsername(e.target.value)}} type="text" placeholder="seuusuario"/>
                <DisplayText color="#C55A11" fontSize="7pt" hasPadLeft>{usernameStatus}</DisplayText>

                <DisplayText fontSize="9pt" hasTop middle>Crie uma senha para a sua conta</DisplayText>
                <Input name="password" onChange={(e) => {setPassword({...password, first: e.target.value.substr(0, 500)}); ValidatePassword(e.target.value, password.second)}} type="password" placeholder="Digite sua senha"/>
                <Input name="repassword" onChange={(e) => {setPassword({...password, second: e.target.value.substr(0, 500)}); ValidatePassword(password.first, e.target.value)}} type="password" placeholder="Digite novamente sua senha"/>
                <DisplayText color="#C55A11" fontSize="7pt" hasPadLeft>{passwordStatus}</DisplayText>

                <ContinueButton marginTop='20px'>Criar Conta</ContinueButton>
            </Form>
        </FormContainer>
    )
}