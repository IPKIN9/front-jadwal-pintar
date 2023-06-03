import iziToast from 'izitoast'

export default {
  successNotif(payload: any) {
    iziToast.success({
      title: payload.title,
      message: payload.message,
      position: 'topRight'
    })
  },
  confirmNotif(callback: () => void) {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      id: 'question',
      backgroundColor: '#FF6969',
      zindex: 999,
      title: 'Hapus Data',
      message: 'Apakah kamu yakin?',
      position: 'center',
      buttons: [
        ['<button><b>YES</b></button>', function (instance, toast) {

          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          callback()

        }, true],
        ['<button><b>No</b></button>', function (instance, toast) {

          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

        }, false]
      ]
    });
  }
}