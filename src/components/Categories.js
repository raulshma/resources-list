import React, { useEffect } from 'react';

function Categories({ values, change }) {
  useEffect(() => {
    console.log(values);
    if (values.length > 0) {
      const target = { target: { value: values[0].id } };
      change(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);
  return (
    <>
      {values.length > 0 ? (
        <select
          name="categories"
          className="input select"
          onChange={change}
          defaultValue={values[0].id}
        >
          <option value="">Category</option>
          {values.map((e) => (
            <option value={e.id} key={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      ) : (
        <></>
      )}
    </>
  );
}

export default Categories;
