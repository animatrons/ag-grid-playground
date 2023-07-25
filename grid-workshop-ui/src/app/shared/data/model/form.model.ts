export interface Field {
  code: string,
  label: string,
  type: 'string' | 'number' | 'date',
  mandatory: boolean,
  isList?: boolean,
  tip?: string,
  hint?: string,
  errorHint?: string,
}
