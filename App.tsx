import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';

interface Company {
  name: string;
  priorityTarget: string;
  type: string;
  rationale: string;
  alternateWay: string;
  link: string;
}

const sheetId = process.env.SHEET_ID;
const apiKey = process.env.API_KEY;
const sheetName = process.env.SHEET_NAME;

const transformCompaniesData = data => {
  const transformedData: Company[] = [];

  data.forEach(item => {
    const company: Company = {} as Company;

    company.name = item[0];
    company.priorityTarget = item[1];
    company.type = item[2];
    company.rationale = item[3];
    company.alternateWay = item[4];
    company.link = item[5];

    transformedData.push(company);
  });

  return transformedData;
};

function App(): React.JSX.Element {
  const [companiesData, setCompaniesData] = useState<Company[]>([]);

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`,
    )
      .then(response => response.json())
      .then(data => {
        data.values.shift();

        const transformedData: Company[] = transformCompaniesData(data.values);
        setCompaniesData(transformedData);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <SafeAreaView>
      <Text>NoThanks Aussie</Text>
      <Text>Here are the companies we should say No Thanks to: </Text>
      {companiesData.length > 0 ? (
        companiesData.map(company => (
          <Text key={company.name}>Company Name: {company.name}</Text>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
}

export default App;
