interface DateObject {
  hari : string;
  tgl  : number;
  bulan: number;
  tahun: number;
  data : any[]
}
export default {
  getDayName (dayIndex: number): string {
    const days: string[] = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return days[dayIndex];
  },
  
  getDate (year: number, month: number): DateObject[][] {
    const startDate: Date           = new Date(year, month - 1, 1);
    const endDate  : Date           = new Date(year, month, 0);
    const dates    : DateObject[]   = [];
    const result   : DateObject[][] = [];
  
    // Menambahkan tanggal sebelumnya jika tanggal satu bukan hari Senin
    while (startDate.getDay() !== 1) {
      startDate.setDate(startDate.getDate() - 1);
    }
  
    // Menambahkan tanggal-tanggal dari awal bulan sampai akhir bulan
    for (let date: Date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayOfWeek: number = date.getDay();
  
      // Skip tanggal hari Sabtu dan Minggu
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        continue;
      }
  
      const tanggal: number = date.getDate()    ;
      const hari   : string = this.getDayName(dayOfWeek);
      const bulan  : number = date.getMonth() + 1;
      const tahun  : number = date.getFullYear();
  
      const dateObject: DateObject = {
        hari : hari,
        tgl  : tanggal,
        bulan: bulan,
        tahun: tahun,
        data : []
      };
  
      dates.push(dateObject);
    }
  
    // Membagi data menjadi array per 5 hari
    for (let i = 0; i < dates.length; i += 5) {
      result.push(dates.slice(i, i + 5));
    }
  
    return result;
  }
}