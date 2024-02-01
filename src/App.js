import './App.css';
import React, { useEffect, useState } from "react";
import useCustom from "./useCustom";
import DoubleRange from "./DoubleRange";
const Header = ({ column }) => {
  return (<thead>
    <tr>
      {column.map((val) => {
        return <th key={val} className='table-cell'>{val}</th>
      })}
    </tr>
  </thead>)
}
const ContentBody = ({ data }) => {
  const colorGen = () => {
    return `#${Math.random().toString(16).substr(-6)}`;
  }
  return (
    <tbody>
      {data?.length ?
        data.map(({ resource }, index) => {
          const Patient = {
            id: resource?.id,
            name: resource?.name?.[0]?.given.join(' ') || 'NA',
            gender: resource?.gender || 'NA',
            birthDate: resource?.birthDate || 'NA',
            addr: resource?.address?.[0]?.line || 'NA',
            phone: resource?.telecom?.[0]?.value || 'NA'
          };
          return (<tr key={index}>
            <td className='table-cell'><span className='badge' style={{
              'backgroundColor': colorGen()
            }}>{Patient.name.charAt(0)}</span> {Patient.name}</td>
            <td className='table-cell'>{Patient.id}</td>
            <td className='table-cell'>{Patient.gender}</td>
            <td className='table-cell'>{Patient.birthDate}</td>
            <td className='table-cell'>{Patient.addr}</td>
            <td className='table-cell'>{Patient.phone}</td>

          </tr>)
        }) : <tr><td style={{ 'text-align': 'center' }} colSpan="6">No Patient available in these age</td></tr>
      }
    </tbody>
  )
}
const App = () => {
  const [minvalue, setMinAge] = useState(0);
  const [maxvalue, setMaxAge] = useState(100);
  const { data } = useCustom(minvalue);
  const columns = ['Name', 'Id', 'Gender', 'BirthDate', 'Address', 'Phone']
  const MakeCall = (min, max) => {
    setMinAge(min)
    setMaxAge(max)
  };
  const filterDate = () => {
    return data?.data?.entry?.filter(({ resource }) => {
      const { birthDate } = resource;
      var today = new Date();
      var patientDob = new Date(birthDate);
      var age = today.getFullYear() - patientDob.getFullYear();
      var month = today.getMonth() - patientDob.getMonth();
      if (month < 0 || (month == 0 && patientDob.getDate() > today.getDate())) { age = age - 1; }
      return age > minvalue && age < maxvalue;
    });
  }
  return (
    <div className="App">
      <div>
        <DoubleRange onChange1={MakeCall} />
        <h3>Patient List</h3>
        <table>
          <Header column={columns} />
          <ContentBody data={filterDate()} />
        </table>
      </div>
    </div>
  );
}

export default App;
