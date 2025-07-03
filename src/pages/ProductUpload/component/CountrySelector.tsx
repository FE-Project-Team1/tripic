import { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';

function CountrySelector() {
  const [selected, setSelected] = useState('');

  return (
    <div>
      <h3 className="font-medium text-xs text-gray mb-[10px]">장소</h3>
      <ReactFlagsSelect
        selected={selected}
        onSelect={(code) => setSelected(code)}
      />
    </div>
  );
}

export default CountrySelector;
