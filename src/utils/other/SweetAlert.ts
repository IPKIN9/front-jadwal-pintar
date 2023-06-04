import Swal from 'sweetalert2'
export default {
  confirmNotif(callback: () => void): void {
    Swal.fire({
      title: 'Hapus data ini?',
      text: "Data ini tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        callback()
      }
    })
  }
}