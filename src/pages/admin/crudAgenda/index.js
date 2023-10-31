import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';

import '../../../styleGlobal.css';
import './index.css'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

function CrudAgenda(){
   {/* const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'cliente'){
            navigate('/signin');
        } else if(userType === 'admin'){
            setIsUserLoggedIn(userType === "admin");
        }
        
    }, []); */}


    return (
        <div>
            <Menu/>
            <section>
            <div className="tituloDashboard">
                <h1>Agendamen<span className="span-color-dashboard">tos</span></h1>
            </div>
            <div className="custom-calendar">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locales={[allLocales, ptBrLocale]}
                locale="pt-br"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'year,month,week,day'
                  }}
                  views={{
                    year: {
                      type: 'dayGrid',
                      duration: { years: 1 },
                      buttonText: 'Ano'
                    },
                    month: {
                      type: 'dayGrid',
                      duration: { months: 1 },
                      buttonText: 'Mês'
                    },
                    week: {
                      type: 'timeGridWeek',
                      duration: { weeks: 1 },
                      buttonText: 'Semana'
                    },
                    day: {
                      type: 'timeGridDay',
                      duration: { days: 1 },
                      buttonText: 'Dia'
                    }
                  }}
                  events={[
                    {
                      title: 'Evento 1',
                      date: '2023-10-30'
                    },
                    {
                      title: 'Evento 2',
                      date: '2023-10-31'
                    }
                  ]}
                  
                />
            </div>
            </section>
        </div>
    )
}

export default CrudAgenda;