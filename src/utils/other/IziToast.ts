import iziToast from 'izitoast'

export default {
  successNotif(payload: any) {
    iziToast.success({
      title: payload.title,
      message: payload.message,
      position: 'topRight'
    })
  }
}