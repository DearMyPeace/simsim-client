import React, { useEffect, useRef } from 'react';
import SettingSection from '@components/setting/SettingSection';
import { CSVLink } from 'react-csv';

interface IExportCSVButtonProps {
  label: string;
  onPress: () => void;
  data: string;
  filename: string;
}

function ExportCSVButton({ label, onPress, data, filename }: IExportCSVButtonProps) {
  const link = useRef<any>(null);

  useEffect(() => {
    if (data) {
      link.current.link.click();
    }
  }, [data]);

  return (
    <>
      <SettingSection label={label} onPress={onPress} />
      <CSVLink ref={link} data={data} filename={filename} className="hidden" />
    </>
  );
}

export default ExportCSVButton;
