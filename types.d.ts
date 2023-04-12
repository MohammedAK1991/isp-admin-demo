export interface User {
  access: string;
  refresh: string;
  user: {
    customer: number;
    date_joined: Date;
    email: string;
    customer_key: string;
    id: number;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: never;
  };
}

export interface Customer {
  additional_integrations_data: unknown;

  api_dynamic: unknown;

  api_enabled: string[];

  api_static: unknown;

  app: string;

  available_integrations: string[];

  creds_bigpanda: unknown;

  creds_conviva: unknown;

  creds_youbora: unknown;

  cross_account_role_ARN: string;

  crossaccount_resource_permissions: string[];

  customer_account_id: string;

  customer_aws_region: string;

  detected_permissions: unknown;

  id: number;

  is_active: boolean;

  key: string;

  mux_details: unknown;

  name: string;

  selected_integrations: string[];
}

export interface Log_search {
  url: string
  parameter: string
}
export interface QueriesItem {
  query: string
  level: string
}

export interface ThresholdItem {
  metric: string
  comparison_type: string
  value: number
}
export interface Threshold_definition {
  name: string
  severity: string
  comprison_type: string
  threshold: ThresholdItem[]
}

export interface ThresholdListItem {
  threshold_definition: Threshold_definition
}

export interface ISPConfig {
  customer: string
  target: string
  api_url: string
  schedule: string
  log_search: Log_search
  secret_id: string
  bucket_name: string
  bucket_region: string
  queries: QueriesItem[]
  threshold_list: ThresholdListItem[]
}
