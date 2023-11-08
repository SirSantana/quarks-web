import { useState } from "react";



export default function AddHorario({setDataImportante, dataImportante}) {
  const defaultOpeningTime = '08:00'; // Hora de apertura por defecto
  const defaultClosingTime = '18:00';
  const [weekHours, setWeekHours] = useState([
    { day: 'Lun', isOpen: true, openingTime: defaultOpeningTime, closingTime: defaultClosingTime },
    { day: 'Mar', isOpen: true, openingTime: defaultOpeningTime, closingTime: defaultClosingTime },
    { day: 'Mié', isOpen: true, openingTime: defaultOpeningTime, closingTime: defaultClosingTime },
    { day: 'Jue', isOpen: true, openingTime: defaultOpeningTime, closingTime: defaultClosingTime },
    { day: 'Vie', isOpen: true, openingTime: defaultOpeningTime, closingTime: defaultClosingTime },
    { day: 'Sáb', isOpen: true, openingTime: defaultOpeningTime, closingTime: '15:00' },
    { day: 'Dom', isOpen: false, openingTime: '', closingTime: '' },
  ]);

  const handleOpenCheckboxChange = (index) => (event) => {
    const updatedWeekHours = [...weekHours];
    updatedWeekHours[index].isOpen = event.target.checked;
    setWeekHours(updatedWeekHours);
  };

  const handleOpeningTimeChange = (index) => (event) => {
    const updatedWeekHours = [...weekHours];
    updatedWeekHours[index].openingTime = event.target.value;
    setWeekHours(updatedWeekHours);
    const horarioFormateado = formatHoursString()
    setDataImportante({...dataImportante, horario: horarioFormateado})

  };

  const handleClosingTimeChange = (index) => (event) => {
    const updatedWeekHours = [...weekHours];
    updatedWeekHours[index].closingTime = event.target.value;
    setWeekHours(updatedWeekHours);
    const horarioFormateado = formatHoursString()
    setDataImportante({...dataImportante, horario: horarioFormateado})
  };
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    let formattedTime = '';

    if (Number(hours) > 12) {
      formattedTime += `${Number(hours) - 12}:${minutes} PM`;
    } else if (Number(hours) === 12) {
      formattedTime += `12:${minutes} PM`;
    } else {
      formattedTime += `${hours}:${minutes} AM`;
    }
    return formattedTime;
  };
  const formatHoursString = () => {
    return weekHours
      .map((day) => {
        if (day.isOpen) {
          const formattedOpeningTime = formatTime(day.openingTime);
          const formattedClosingTime = formatTime(day.closingTime);
          return `${day.day} ${formattedOpeningTime} - ${formattedClosingTime}`;
        } else {
          return `${day.day} Cerrado`;
        }
      })
      .join(',');
  };


  return (
    <div>
      {
        weekHours.map((day, index) => (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', marginBottom: '16px', width: '100%' }} key={index}>
            <label htmlFor={`open-checkbox-${index}`}>{day.day}:</label>
            <input
              type="checkbox"
              id={`open-checkbox-${index}`}
              checked={day.isOpen}
              onChange={handleOpenCheckboxChange(index)}
            />

            {day.isOpen && (
              <div style={{display:'flex', flexDirection:'row'}}>
                <label htmlFor={`opening-time-${index}`}></label>
                <input
                  type="time"
                  id={`opening-time-${index}`}
                  value={day.openingTime}
                  onChange={handleOpeningTimeChange(index)}
                />

                <label style={{margin:'0px 16px'}} htmlFor={`closing-time-${index}`}>  -  </label>
                <input
                  type="time"
                  id={`closing-time-${index}`}
                  value={day.closingTime}
                  onChange={handleClosingTimeChange(index)}
                />
              </div>
            )}
          </div>
        ))
      }

    </div>
  )
}