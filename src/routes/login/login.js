import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentContainer, ContinueButton, MainWebsiteContainer, FormContainer, FormCall, DisplayText, Form, AlternativeFormContainer, JoinContainer, JoinButton, InformativeAssideContainer, InformativeAssidePannel, InfoMiddleAligner, InfoMain, InfoSub, InfoJoinButtonContainer, InfoJoinButton, FormReturnMessage } from '../../components/login';
import AlternativeButton from '../../components/login/altButton';
import { Input } from '../../components/login/input';
import Menu from '../../components/login/menu';
import { HTTPRequest } from '../../workers/commons';
import { SetTokens } from '../../workers/auth';

export function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formVars, setformVars] = useState({checking: false, checked: false, error: '', focusPassword: false});

    let focus = formVars.focusPassword;


    function usernameChange(event){
        setUsername(event.target.value);
        setformVars({...formVars, focusPassword: false, checked: false});
        focus = false;
    }

    function submitForm(event){
        event.preventDefault();
        event.stopPropagation();
        
        setformVars({...formVars, checking: true, error: '', focusPassword: false});

        if(formVars.checked){
            HTTPRequest('POST', "/v0/auth/login", {username, password, "keep-logged": 'true'}, false).then(async (result) => {
                if(result.success) {
                    await SetTokens(result.data);
                    window.location.href = "/";
                } else setformVars({error: result.error, checking: false, checked: true, focusPassword: true});
            })
        } else {
            let body = new FormData();
            body.append("username", username);

            HTTPRequest('GET', "/v0/auth/check", {username}, false).then(function(result){
                if(result.success) {
                    setformVars({checked: true, checking: false, error: '', focusPassword: true});
                } else setformVars({error: "Login Incorreto!", checking: false, checked: false, focusPassword: false});
            });
        }
    }
    
    useEffect(() => {
        if(formVars.focusPassword && focus) document.forms['login-form'].elements['password'].focus();
    })

    return (
        <ContentContainer>
            <MainWebsiteContainer>
                <Menu />
                <FormContainer>
                    <FormCall>
                        <DisplayText color="white" fontSize="14pt" center bold lessBottom>Thidle Login</DisplayText>
                        <DisplayText color="white" fontSize="9pt" center>Junte-se às pessoas que pensam</DisplayText>
                    </FormCall>
                    <Form onSubmit={submitForm} name="login-form" disabled={formVars.checking}>
                        <FormReturnMessage>{formVars.error}</FormReturnMessage>
                        <Input type="text" name="username" onChange={usernameChange} autocomplete="off" placeholder="Telefone, E-Mail ou nome de usuário"/>
                        <Input hidden={!formVars.checked} type="password" onChange={(e) => setPassword(e.target.value)} name="password" autocomplete="off" placeholder="Digite sua senha"/>
                        <ContinueButton>Continuar</ContinueButton>
                    </Form>
                    <AlternativeFormContainer>
                        <DisplayText center fontSize="11pt">ou faça login utilizando</DisplayText>
                        <AlternativeButton alt="Google Logo" src="/contents/assets/logos/google.png" title="Google"/>
                        <AlternativeButton alt="Apple Logo" src="/contents/assets/logos/apple.png" title="Apple"/>
                        <AlternativeButton alt="Facebook Logo" src="/contents/assets/logos/facebook.png" title="Facebook"/>
                    </AlternativeFormContainer>
                    <JoinContainer>
                        <DisplayText center fontSize='11pt'>Não tem uma conta?</DisplayText>
                        <Link to='/signup'><JoinButton>Junte-se agora!</JoinButton></Link>
                    </JoinContainer>
                </FormContainer>
            </MainWebsiteContainer>
            <InformativeAssideContainer>
                <InformativeAssidePannel>
                    <InfoMiddleAligner>
                        <InfoMain>Compartilhe seus Pensamentos</InfoMain>
                        <InfoSub>com seus amigos, onde você estiver, o que você quiser.</InfoSub>
                        <InfoSub>Escolha quem pode vê-los</InfoSub>
                        <InfoSub>publique somente para seus amigos, para todos, ou pense anonimamente!</InfoSub>
                        <InfoJoinButtonContainer>
                            <Link to='/signup'>
                                <InfoJoinButton>Junte-se agora!</InfoJoinButton>
                            </Link>
                        </InfoJoinButtonContainer>
                    </InfoMiddleAligner>
                </InformativeAssidePannel>
            </InformativeAssideContainer>
        </ContentContainer>
    );
}