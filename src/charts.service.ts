import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class ChartsService {
  constructor(
    private dataSource: DataSource,

  ) {}



  async currentMonthFollowup() {
    const result = await this.dataSource.query('CALL currentMonthFollowup()');
    let data = result[0];
    console.log(data)

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let dateArray = [];
    let valuesArray = [];

    // Generate all dates of the current month with default 0 values
    for (let day = 1; day <= daysInMonth; day++) {
        let formattedDate = new Date(year, month, day).toISOString().split('T')[0]; // Format YYYY-MM-DD
        dateArray.push(formattedDate);
        valuesArray.push(0); // Default count = 0
    }

    // If there are database results, update valuesArray
    if (data && data.length > 0) {
        data.forEach(entry => {
            let index = dateArray.indexOf(entry.followup_date);
            if (index !== -1) {
                valuesArray[index] = parseFloat(entry.count); // Update with actual count from DB
            }
        });
    }



    return {lables:dateArray,values:valuesArray};
  }

 

}
