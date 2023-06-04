import iziToast from 'izitoast'
import ErroMsg from './ErroMsg';

export default {
  successNotif(payload: any) {
    iziToast.success({
      title: payload.title,
      message: payload.message,
      position: 'topRight'
    })
  },

  errorNotif(code: number) {
    const msg = ErroMsg(code)
    iziToast.error(msg);
  }
}