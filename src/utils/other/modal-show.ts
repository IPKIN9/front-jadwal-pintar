export default {
  showHideModal(idModal: string): void {
      $(`#${idModal}`).modal('show') ? $(`#${idModal}`).modal('hide') : $(`#${idModal}`).modal('show')
    }
}