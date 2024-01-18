import axios from 'axios'
import './App.css';
import { useEffect, useState } from 'react';
import { DatePicker } from 'antd';

const App = () => {
  const URL_WITH_THE_MOST_SECRET_KEY = 'https://api.nasa.gov/planetary/apod?api_key=2CeUWmoP1VPygHLRgSOhnoD0jmgqP0gpKUn5Rich';

  const { RangePicker } = DatePicker;

  const [content, setContent] = useState(null);
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [dayValue, setDayValue] = useState(null);
  const [rangeValue, setRangeValue] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    axios.get(URL_WITH_THE_MOST_SECRET_KEY, {
      params: params,
    }).then((resp) => {
      const content = Array.isArray(resp.data) ? resp.data : resp.data.url;
      setLoading(false);
      setContent(content);
    });
  }, [params]);

  const onChange = (date, dateString) => {
    setRangeValue(null);
    setLoading(true);
    if (dateString) {
      setLoading(false);
      setDayValue(date);
      setParams({date: dateString})
    }   
  };

  const onChangeRange = (date, dateString) => {
    setDayValue(null);
    setLoading(true);
    if (dateString) {
      setLoading(false);
      setRangeValue(date);
      setParams({
        start_date: dateString[0],
        end_date: dateString[1]
      })
    }   
  };

  const disabledDatesSettings = (current) => {
    return current && current.valueOf() > Date.now();
  };

  return (
    <div className="app">
      <header className="app-header">
        <DatePicker 
          value={dayValue}
          className="date-picker"
          disabledDate={disabledDatesSettings}
          onChange={onChange} 
        />
        <RangePicker 
          value={rangeValue}
          className="date-picker"
          disabledDate={disabledDatesSettings}
          onChange={onChangeRange}
        />
      </header>
      <div className="content">
        {
          loading ? 
            <span className="loading">Loading...</span> : 
            content && Array.isArray(content) ? 
              <div className="picture-list">
                {
                  content.map(item => {
                    return <img 
                      key={item.url}
                      src={item.url} 
                      alt="Picture"  
                    />
                  })
                }
              </div>
              :
              <img 
                className=""
                src={content} 
                alt="Picture of the day"  
              />
        }
      </div>
    </div>
  );
}

export default App;
