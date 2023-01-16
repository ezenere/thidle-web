import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ModalBackgroudContainer, ModalBox, ModalHeader, ModalTitle, ModalBody, CloseTitleButton, BackTitleButton, ExcludeTitleButton, FinishTitleButton } from ".";
import { useModals } from "../../../contexts/modals";
import { useThoughts } from "../../../contexts/thoughts";
import { UserContext } from "../../../contexts/user";
import { HTTPRequest } from "../../../workers/commons";
import { Uploader } from "../../../workers/upload";

export default function UpdateProfilePicture({ picture, active, close }) {
    const info = useContext(UserContext);
    const [file, setFile] = useState(null);
    const [blob, setBlob] = useState(null);
    const [over, setOver] = useState(false);
    const [dragging, setDragging] = useState({ active: false, lastX: 0, lastY: 0 });
    const [position, setPosition] = useState({ left: 0, top: 0, width: 0, height: 0 });
    const [reallyActive, setReallyActive] = useState(false);
    const imageRef = useRef(null);
    const modals = useModals();
    const [,clear] = useThoughts('__clear_all__');

    const mimes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];

    useEffect(() => {
        document.body.classList[active ? 'add' : 'remove']('no-overflow');
        if(active) setReallyActive(true);
        else setTimeout(()=>setReallyActive(false), 300);
        return () => document.body.classList.remove('no-overflow');
    }, [active])

    useEffect(() => {
        if(file) {
            const fr = new FileReader();
            fr.onload = function() {
                const blob = new Blob([fr.result])
                const url = URL.createObjectURL(blob, {type: file.type});
                setBlob(url);
            }
            fr.readAsArrayBuffer(file);
        }
    }, [file]);

    useEffect(() => {
        const load = () => {
            console.log('update')
            setPosition({
                left: (imageRef.current.clientWidth - Math.min(imageRef.current.clientHeight, imageRef.current.clientWidth)) / 2, 
                top: (imageRef.current.clientHeight - Math.min(imageRef.current.clientHeight, imageRef.current.clientWidth)) / 2,
                width: Math.min(imageRef.current.clientHeight, imageRef.current.clientWidth),
                height: Math.min(imageRef.current.clientHeight, imageRef.current.clientWidth),
            });
        }
        if (imageRef.current) {
            imageRef.current.onload = load;
            load();
        }
    }, [blob]);

    const move = useCallback((e) => {
        e.preventDefault();
        if(dragging.active === 'circle'){
            setPosition({ 
                left: Math.max(Math.min(e.clientX - dragging.x + dragging.left, imageRef.current.clientWidth - dragging.width), 0), 
                top: Math.max(Math.min(e.clientY - dragging.y + dragging.top, imageRef.current.clientHeight - dragging.height), 0), 
                width: dragging.width, 
                height: dragging.height 
            });
        } else if(dragging.active === 'tl'){
            const min = Math.min(e.clientX - dragging.x, e.clientY - dragging.y)
            setPosition({ 
                left: Math.max(Math.min(dragging.left + min, imageRef.current.clientWidth - position.width), 0), 
                top: Math.max(Math.min(dragging.top + min, imageRef.current.clientHeight - position.height), 0), 
                width: Math.max(Math.min(dragging.width - min, Math.min(imageRef.current.clientWidth, imageRef.current.clientHeight)), 15),
                height: Math.max(Math.min(dragging.height - min, Math.min(imageRef.current.clientWidth, imageRef.current.clientHeight)), 15)
            });
        } else if(dragging.active === 'tr'){
            const min = Math.min(dragging.x - e.clientX, e.clientY - dragging.y)
            setPosition({ 
                left: Math.max(Math.min(dragging.left, imageRef.current.clientWidth - position.width), 0),
                top: Math.max(Math.min(dragging.top + min, imageRef.current.clientHeight - position.height), 0),
                width: Math.max(Math.min(dragging.width - min, Math.min(imageRef.current.clientWidth, imageRef.current.clientHeight)), 15),
                height: Math.max(Math.min(dragging.height - min, Math.min(imageRef.current.clientWidth, imageRef.current.clientHeight)), 15)
            });
        } else if(dragging.active === 'bl'){
            const min = Math.min(e.clientX - dragging.x, dragging.y - e.clientY)
            setPosition({ 
                left: Math.max(Math.min(dragging.left + min, imageRef.current.clientWidth - position.width), 0),
                top: Math.max(Math.min(dragging.top, imageRef.current.clientHeight - position.height), 0),
                width: Math.max(Math.min(dragging.width - min, Math.min(imageRef.current.clientWidth, imageRef.current.clientHeight)), 15),
                height: Math.max(Math.min(dragging.height - min, Math.min(imageRef.current.clientWidth, imageRef.current.clientHeight)), 15)
            });
        } else if(dragging.active === 'br'){
            const min = Math.min(dragging.x - e.clientX, dragging.y - e.clientY)
            setPosition({ 
                left: Math.max(Math.min(dragging.left, imageRef.current.clientWidth - position.width), 0),
                top: Math.max(Math.min(dragging.top, imageRef.current.clientHeight - position.height), 0),
                width: Math.max(Math.min(dragging.width - min, Math.min(imageRef.current.clientWidth, imageRef.current.clientHeight)), 15),
                height: Math.max(Math.min(dragging.height - min, Math.min(imageRef.current.clientWidth, imageRef.current.clientHeight)), 15),
            });
        }
    }, [dragging.active, dragging.height, dragging.left, dragging.top, dragging.width, dragging.x, dragging.y, position.height, position.width]);

    const up = useCallback((e) => {
        e.preventDefault();
        setDragging({ active: false });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);
        }
    }, [move, up]);

    return (reallyActive && 
        <ModalBackgroudContainer style={active ? {opacity: '1', visibility: 'visible', cursorEvents: 'none'} : {opacity: '0', visibility: 'hidden', cursorEvents: 'none'}} >
            <ModalBox width={"550px"}>
                <ModalHeader>
                    {file ? <BackTitleButton onClick={() => setFile(null)} /> : (picture && <ExcludeTitleButton onClick={() => {
                        modals.open('continue', {
                            title: "Link Externo", 
                            description: "Tem certeza de que deseja remover sua foto de perfil?", 
                            buttons: {continue: "Continuar"},
                            continue: async (closeModal) => {
                                await HTTPRequest('DELETE', `/v0/profile/${info.values.username}/picture`);
                                info.set('picture', null);
                                clear(null);
                                close();
                                closeModal();
                            },
                            cancel: (close) => {close();}
                        })
                    }} />) }
                    <ModalTitle ml={file ? '0' : picture ? '0' : '35'}>New profile picture</ModalTitle>
                    {file ? <FinishTitleButton onClick={() => {
                        const scale = Math.min(position.height, position.width)
                        const scaleOriginal = Math.min(imageRef.current.naturalWidth, imageRef.current.naturalHeight) / Math.min(imageRef.current.clientWidth, imageRef.current.clientHeight)
                        const uploader = new Uploader(file, 'profile', {
                            x: Math.round(position.left * scaleOriginal),
                            y: Math.round(position.top * scaleOriginal),
                            scale: Math.round(scale * scaleOriginal)
                        });
                        uploader.upload()
                        .then((result) => {
                            info.set('picture', result);
                            setFile(null);
                            setBlob(null);
                            setOver(false);
                            clear(null);
                            close();
                        })
                        .catch(() => {
                            close();
                        });
                    }} /> : <CloseTitleButton onClick={close} />}
                </ModalHeader>
                <ModalBody>
                    {file ? (!!blob && (
                        <PictureCropContainer
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setDragging({ active: 'circle', x: e.clientX, y: e.clientY, ...position });
                            }} >
                            <UploadProfileImage src={blob} ref={imageRef} />
                            <PictureCropArea 
                                style={position} 
                            >
                                <PictureCropAreaCorner position="tl" onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setDragging({ active: 'tl', x: e.clientX, y: e.clientY, ...position });
                                }} />
                                <PictureCropAreaCorner position="tr" onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setDragging({ active: 'tr', x: e.clientX, y: e.clientY, ...position });
                                }} />
                                <PictureCropAreaCorner position="bl" onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setDragging({ active: 'bl', x: e.clientX, y: e.clientY, ...position });
                                }} />
                                <PictureCropAreaCorner position="br" onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setDragging({ active: 'br', x: e.clientX, y: e.clientY, ...position });
                                }} />
                            </PictureCropArea>
                        </PictureCropContainer>
                    )): (
                        <UploadInputContainer 
                            htmlFor="profile-picture-upload" 
                            onDragOver={(e) => {
                                setOver(true);
                                e.preventDefault();
                            }}
                            onDragLeave={(e) => {
                                setOver(false);
                                e.preventDefault();
                            }}
                            onDrop={(e) => {
                                e.preventDefault();

                                if (e.dataTransfer.items && e.dataTransfer.items.length === 1) {
                                    const file = e.dataTransfer.items[0].getAsFile();
                                    if (mimes.includes(file.type)) setFile(file);
                                    else setOver(null);
                                } else if(e.dataTransfer.files && e.dataTransfer.files.length === 1) {
                                    const file = e.dataTransfer.files[0];
                                    if (mimes.includes(file.type)) setFile(file);
                                    else setOver(null);
                                }
                            }}
                        >
                            <input type="file" style={{ display: 'none' }} onChange={(e) => {
                                if (e.target.files.length > 0) {
                                    if (mimes.includes(e.target.files[0].type)) setFile(e.target.files[0]);
                                    else setOver(null);
                                }
                            }} accept={mimes.join(',')} id="profile-picture-upload" />
                            <UploadInputIcon />
                            <UploadInputText>{ over === null ? <>File type must be JPEG, PNG, GIF or BMP</> : (over ? <>Drop file</> : <>Drag a file here or<br />click to select an image</>) }</UploadInputText>
                        </UploadInputContainer>
                    )}
                </ModalBody>
            </ModalBox>
        </ModalBackgroudContainer>
    );
}

const UploadInputContainer = styled.label`
    margin: 25px;
    height: 300px;
    border: 2px dashed #ffffff75;
    border-radius: 25px;
    color: #ffffff75;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: color 0.2s, border-color 0.2s;
    cursor: pointer;

    :hover {
        color: white;
        border-color: white;
    }
`

const UploadInputIcon = styled.div.attrs({
    className: "material-icons-round"
})`
    pointer-events: none;
    ::before {
        content: 'add_a_photo';
        font-size: 30pt;
    }
`

const UploadInputText = styled.div`
    font-size: 13pt;
    font-family: 'Ubuntu', sans-serif;
    text-align: center;
    margin-top: 15px;
    line-height: 30px;
    pointer-events: none;
`

const PictureCropContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    cursor: move;
    overflow: hidden;
`;

const PictureCropArea = styled.div`
    box-shadow: 0 0 0 4000px rgb(0 0 0 / 30%);
    position: absolute;
    border-radius: 50%;
    border: 1px dashed white;
    min-width: 15px;
    min-height: 15px;
    top: 0px;
    left: 0px;
    box-sizing: border-box;
`;

const PictureCropAreaCorner = styled.div`
    width: 6px;
    height: 6px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    ${({position}) => {
        switch(position){
            case 'tl':
                return `
                    top: -3px;
                    left: -3px;
                    cursor: nw-resize;
                `;
            case 'tr':
                return `
                    top: -3px;
                    right: -3px;
                    cursor: ne-resize;
                `
            case 'bl':
                return `
                    bottom: -3px;
                    left: -3px;
                    cursor: sw-resize;
                `
            case 'br':
                return `
                    bottom: -3px;
                    right: -3px;
                    cursor: se-resize;
                `
            default: 
                return '';
        }
    }}
`

const UploadProfileImage = styled.img`
    width: 100%;
`