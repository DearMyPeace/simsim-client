// colors.ts

export const appColor1 = '#F1E2CC';
export const appColor2 = '#E8C795';
export const appColor3 = '#C48E24';
export const appColor4 = '#A46F07';
export const appColor5 = '#765921';
export const alertColor = '#EB6D52';

export const appColor3Opacity = (range: number) => {
  return `rgba(196, 142, 24, ${range})`;
};

export const dotColors: { [key: number]: string } = {
  1: '#D5C0A4',
  2: '#BA9348',
  3: '#7A5F3F',
};

export const pieColors = [appColor2, '#dcb15c', appColor3, appColor4, '#856017'];
