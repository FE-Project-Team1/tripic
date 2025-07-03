import ReactFlagsSelect from 'react-flags-select';

interface CountrySelectorProps {
  onCountrySelect: (countryName: string) => void;
  selectedCountry: string;
}

interface ICountryNames {
  [key: string]: string;
}

export const countryNames: ICountryNames = {
  KR: 'South Korea',
  US: 'United States',
  JP: 'Japan',
  CN: 'China',
  GB: 'United Kingdom',
  FR: 'France',
  DE: 'Germany',
  IT: 'Italy',
  ES: 'Spain',
  CA: 'Canada',
  AU: 'Australia',
  BR: 'Brazil',
  IN: 'India',
  RU: 'Russia',
  MX: 'Mexico',
  TH: 'Thailand',
  VN: 'Vietnam',
  SG: 'Singapore',
  MY: 'Malaysia',
  PH: 'Philippines',
};

const getCountryName = (code: string): string => {
  return countryNames[code] || code;
};

function CountrySelector({
  onCountrySelect,
  selectedCountry,
}: CountrySelectorProps) {
  const handleCountryChange = (code: string) => {
    const countryName = getCountryName(code);
    onCountrySelect(countryName);
  };

  return (
    <div>
      <h3 className="font-medium text-xs text-gray mb-[10px]">장소</h3>
      <ReactFlagsSelect
        selected={selectedCountry}
        onSelect={handleCountryChange}
        placeholder="국가를 선택하세요"
        countries={[
          'KR',
          'US',
          'JP',
          'CN',
          'GB',
          'FR',
          'DE',
          'IT',
          'ES',
          'CA',
          'AU',
          'BR',
          'IN',
          'RU',
          'MX',
          'TH',
          'VN',
          'SG',
          'MY',
          'PH',
        ]}
      />
    </div>
  );
}

export default CountrySelector;
