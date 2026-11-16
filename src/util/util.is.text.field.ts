/*
* 전역으로 키다운을 했을때 입력 필드 작성인지 구분하는 유틸함수
* */

export const utilIsTextField =(e:KeyboardEvent)=>{
    const el = e.target;
    return (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement);
}