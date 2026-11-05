export const canvasKeyboard = () =>{

    const onKeyDown = (e: KeyboardEvent) => {
        console.log('onKeyDown', e);
    }

    window.addEventListener('keydown',onKeyDown)
    return ()=>{
        window.removeEventListener('keydown',onKeyDown)
    }
}