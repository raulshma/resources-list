import React from 'react';
import { createUseStyles } from 'react-jss';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import Item from './Item';

const useStyles = createUseStyles({
  container: {
    width: '60vw',
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  '@media screen and (max-width: 32em)': {
    container: {
      width: '85vw',
    },
  },
});

const columns = [
  {
    name: 'Title',
    sortable: true,
    cell: (row) => (
      <div
        style={{
          fontWeight: 700,
          maxWidth: '200px',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {row.title}
      </div>
    ),
  },
  {
    name: 'Link',
    selector: 'link',
    sortable: true,
    cell: (row) => (
      <div>
        <div
          style={{
            fontWeight: 700,
            maxWidth: '250px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <a href={row.link} target="_blank" rel="noopener noreferrer">
            {row.link}
          </a>
        </div>
      </div>
    ),
    hide: 'md',
  },
  {
    name: 'Date',
    selector: 'timestamp',
    sortable: true,
    cell: (row) => (
      <div style={{ fontWeight: 400 }}>
        <small>
          {row.timestamp
            ? new Date(row.timestamp.toDate()).toLocaleDateString()
            : 'Loading'}
        </small>
      </div>
    ),
    maxWidth: '85px',
    minWidth: '85px',
  },
];

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

const ProgressComponent = () => {
  return <div className="loader loader-sm color__loader mt0">Loading...</div>;
};

function Items({ isLoading, categoryId, data }) {
  const classes = useStyles();
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  const filteredItems = data.filter(
    (item) =>
      (item.title &&
        item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.link && item.link.toLowerCase().includes(filterText.toLowerCase()))
  );
  return (
    <>
      <div className={classes.container}>
        <DataTable
          title="Resources"
          columns={columns}
          data={filteredItems}
          defaultSortField="timestamp"
          defaultSortAsc={false}
          pagination={true}
          noHeader={true}
          highlightOnHover={true}
          pointerOnHover={true}
          expandableRows={true}
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          dense={true}
          progressPending={isLoading}
          progressComponent={<ProgressComponent />}
          expandableRowsComponent={<Item categoryId={categoryId} />}
        />
      </div>
    </>
  );
}

export default Items;
