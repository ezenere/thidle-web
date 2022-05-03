import { useContext } from "react";
import { Link } from "react-router-dom";
import { MenuAnchor, MenuButtons, MenuLogoContainer, MenuLogoImage, PageMenu } from ".";

export default function Menu(){
    return (
        <PageMenu>
            <MenuLogoContainer>
                <Link to="/">
                    <MenuLogoImage src="/contents/assets/images/thidle24-wname.png"/>
                </Link>
            </MenuLogoContainer>
            <MenuButtons>
                <MenuAnchor to="/about">Sobre</MenuAnchor>
                <MenuAnchor to="/privacy-policy">Política de Privacidade</MenuAnchor>
                <MenuAnchor to="/terms-of-service">Termos de Serviço</MenuAnchor>
                <MenuAnchor to="/cookie-policy">Política de Cookies</MenuAnchor>
            </MenuButtons>
        </PageMenu>
    )
}