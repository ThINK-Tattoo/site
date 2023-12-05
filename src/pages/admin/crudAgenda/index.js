import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';

import '../../../styleGlobal.css';
import './index.css'

import axios from 'axios';
import { format } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

function CrudAgenda(){
   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
   
    
    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'cliente'){
            navigate('/signin');
        } else if(userType === 'admin'){
            setIsUserLoggedIn(userType === "admin");
        }

       
        const fetchEventsFromBackend = async () => {
                try {
                  const response = await axios.get('https://api-think-tattoo.up.railway.app/agenda/selectAgenda');
                    const data = response.data;
                    
            
                    // Converta os dados para o formato de evento do FullCalendar
                    const eventsData = data.map(item => {
                      const dateTime = item.dataTattoo
                      const dataFormatada = format(new Date(dateTime), 'yyyyMMdd');

                        return {
                            id: item.id,
                            title: item.nomeCliente,
                            start: dataFormatada + 'T' + item.hTattoo,
                            end:  dataFormatada + 'T' + item.hTattoo
                        };
                    }).filter(event => event !== null); // Remover eventos nulos
            
                    setEvents(eventsData);
                } catch (error) {
                    console.error('Erro ao buscar as tatuagens marcadas: ', error);
                }
            };

      console.log(events);
      
        fetchEventsFromBackend();
        
    }, []);

    
    
    const calendarRef = useRef(null);
    const handleWindowResize = () => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.updateSize();
      }
    };
  
    useEffect(() => {
      window.addEventListener("resize", handleWindowResize);
  
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);

    return (
        <div>
            <Menu/>
            <section>
            <div className="tituloDashboard">
                <h1>Agendamen<span className="span-color-dashboard">tos</span></h1>
            </div>
            <div className="custom-calendar">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                nowIndicator={true}
                slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
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
                  now={new Date()}
                  events={events}
                  
                />
            </div>
            </section>
        </div>
    )
}

export default CrudAgenda;