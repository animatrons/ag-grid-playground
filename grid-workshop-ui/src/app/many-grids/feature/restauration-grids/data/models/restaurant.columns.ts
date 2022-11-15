import { ColDef, ColGroupDef } from "ag-grid-community";
import { Restaurant } from "./restaurant.model";

export const BasicDefaultColDef: ColDef<Restaurant> = {
  'sortable': true,
  'editable': false,
  'resizable': true,
  // valueFormatter: numberFormatter,
  'suppressCellFlash': true,
  // 'suppressMenu': true,
  'filter': 'agTextColumnFilter',

  'floatingFilter': true,
  'floatingFilterComponent': 'simpleTextColumnFilterComponent',
  'floatingFilterComponentParams': {
    suppressFilterButton: true,
  },
  // floatingFilterComponent: 'defaultFilterComponent',
  // headerComponent: 'sortableHeaderComponent',
  // filterParams: { /* buttons: ['apply'] */ debounceMs: 1000 },
  // headerComponentParams: {
  //   menuIcon: 'fa-bars'
  // },
}

export const RestaurantViewColDefs: (ColDef<Restaurant> | ColGroupDef)[] = [
  {
    'field': 'name',
  },
  {
    'field': 'type_of_food',
    'headerName': 'Type of Food',
    'width': 100
  },
  {
    'headerName': 'Address',
    'children': [
      {
        'field': 'address',
        'headerName': 'Main Address',
        'columnGroupShow': 'closed open',
      },
      {
        'field': 'address_line_2',
        'headerName': 'Address Line 2',
        'columnGroupShow': 'open',
      }
    ]
  },
  {
    'field': 'rating',
    'filter': 'agNumberColumnFilter',
    'floatingFilter': false,
    'width': 90
  },
  {
    'field': 'URL',
    'hide': true,
    'filter': false
  },
  {
    'field': 'URL',
    'hide': true,
    'filter': false
  },
  {
    'headerName': 'Codes',
    'children': [
      {
        'field': 'outcode',
        'columnGroupShow': 'closed open',
        'width': 80,
        'filter': false
      },
      {
        'field': 'postcode',
        'columnGroupShow': 'open',
        'width': 80,
        'filter': false
      }
    ]
  },
]