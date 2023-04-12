import { BiExport } from 'react-icons/bi';
import { RiCustomerService2Fill } from 'react-icons/ri';

import { RJSFSchema, UiSchema } from '@rjsf/utils';

export const TOUCHSTREAM_API_URL_AUTH = 'https://int-fe-staging.touchstream-integration.com/api';
export const TOUCHSTREAM_API_URL = process.env.API_HOSTNAME
  || 'https://api-staging.touchstream-integration.com/isp/v1/';

export const menuItems = [
  {
    id: 'Export errors',
    route: '/login',
    icon: BiExport,
  },
  {
    id: 'Login',
    route: '/login',
    icon: RiCustomerService2Fill,
  },
];

export const schemaAdmin: RJSFSchema = {
  type: 'object',
  required: ['customer', 'target', 'api_url', 'secret_id', 'bucket_name', 'bucket_region', 'schedule', 'log_search', 'queries', 'threshold_list'],
  properties: {
    customer: {
      type: 'string',
    },
    target: {
      type: 'string',
      enum: ['hydrolix', 'splunk', 'kinesis'],
    },
    api_url: {
      type: 'string',
    },
    secret_id: {
      type: 'string',
    },
    bucket_name: {
      type: 'string',
    },
    bucket_region: {
      type: 'string',
    },
    schedule: {
      type: 'string',
      enum: ['1m', '2m', '3m'],
    },
    log_search: {
      description: 'Description for LogSearch goes here',
      $ref: '#/definitions/log_search',
    },
    queries: {
      description: 'Description for queries goes here',
      $ref: '#/definitions/queries',
    },
    threshold_list: {
      description: 'Description for threshold_list goes here',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          threshold_definition: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              severity: {
                type: 'string',
                enum: ['Critical', 'Major', 'Minor', 'Warning'],
              },
              comprison_type: {
                type: 'string',
                enum: ['AND', 'OR'],
              },
              threshold: {
                description: 'Description for thresholds goes here',
                $ref: '#/definitions/threshold',
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    log_search: {
      type: 'object',

      properties: {
        url: {
          type: 'string',
        },
        parameter: {
          type: 'string',
        },
      },
    },

    queries: {
      type: 'array',

      items: {
        type: 'object',
        properties: {
          level: {
            type: 'string',
            enum: ['cdn', 'country', 'asn'],
          },
          query: {
            type: 'string',
          },
        },
      },
    },
    threshold: {
      type: 'array',
      items: {
        type: 'object',

        properties: {
          metric: {
            type: 'string',
            enum: ['cache_miss', 'error_pct'],
          },
          comparison_type: {
            type: 'string',
            enum: ['>', '==', '<'],
          },
          value: {
            type: 'integer',
          },
        },
      },
    },
  },
};
export const schemaEditAndView: RJSFSchema = {
  type: 'object',
  required: ['customer', 'target', 'api_url', 'secret_id', 'bucket_name', 'bucket_region', 'schedule', 'log_search', 'threshold_list'],
  properties: {
    customer: {
      type: 'string',
    },
    target: {
      type: 'string',
      enum: ['hydrolix', 'splunk', 'kinesis'],
    },
    api_url: {
      type: 'string',
    },
    secret_id: {
      type: 'string',
    },
    bucket_name: {
      type: 'string',
    },
    bucket_region: {
      type: 'string',
    },
    schedule: {
      type: 'string',
      enum: ['1m', '2m', '3m'],
    },
    log_search: {
      description: 'Description for LogSearch goes here',
      $ref: '#/definitions/log_search',
    },
    threshold_list: {
      description: 'Description for threshold_list goes here',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          threshold_definition: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              severity: {
                type: 'string',
                enum: ['Critical', 'Major', 'Minor', 'Warning'],
              },
              comprison_type: {
                type: 'string',
                enum: ['AND', 'OR'],
              },
              threshold: {
                description: 'Description for thresholds goes here',
                $ref: '#/definitions/threshold',
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    log_search: {
      type: 'object',

      properties: {
        url: {
          type: 'string',
        },
        parameter: {
          type: 'string',
        },
      },
    },
    threshold: {
      type: 'array',
      items: {
        type: 'object',

        properties: {
          metric: {
            type: 'string',
            enum: ['cache_miss', 'error_pct'],
          },
          comparison_type: {
            type: 'string',
            enum: ['>', '==', '<'],
          },
          value: {
            type: 'integer',
          },
        },
      },
    },
  },
};

export const uiSchemaAdmin: UiSchema = {
  customer: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Customer',
    'ui:readonly': true,
  },
  target: {
    'ui:classNames': 'admin-form-row  ',
    'ui:title': 'Target',
    'ui:placeholder': 'Select target from list',
    'ui:widget': 'select',
  },
  api_url: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'API Url',
    'ui:placeholder': 'Enter API Url',
  },
  secret_id: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Secret Id',
    'ui:placeholder': 'Enter Secret Id',
  },
  bucket_name: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Bucket name',
    'ui:placeholder': 'Enter Bucket name',
  },
  bucket_region: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Bucket region',
    'ui:readonly': false,
  },
  schedule: {
    'ui:classNames': 'admin-form-row  d-flex flex-row   ',
    'ui:placeholder': 'Select schedule from list',
    'ui:title': 'Schedule',
  },
  log_search: {
    'ui:classNames': 'admin-form-row log-search',
    'ui:title': 'Log search',
    url: {
      'ui:classNames': 'admin-form-row',
      'ui:title': 'Url',
    },
    parameter: {
      'ui:classNames': 'admin-form-row',
      'ui:title': 'Parameter',
    },
  },
  queries: {
    'ui:classNames': 'admin-form-row log-search',
    'ui:title': 'Queries',
    items: {
      'ui:title': 'query',
      level: {
        'ui:classNames': 'admin-form-row',
        'ui:widget': 'select',
        'ui:placeholder': 'Select level from list',
        'ui:title': 'Level',
      },
      query: {
        'ui:classNames': 'admin-form-row',
        'ui:placeholder': 'Enter query',
        'ui:title': 'Query',
      },
    },
  },
  threshold_list: {
    'ui:classNames': 'admin-form-row log-search',
    'ui:title': 'Threshold list',
    items: {
      'ui:title': 'threshold ',
      threshold_definition: {
        'ui:classNames': 'admin-form-row log-search',
        'ui:title': 'Threshold definition',
        name: {
          'ui:classNames': 'admin-form-row',
          'ui:title': 'Name',
        },
        severity: {
          'ui:classNames': 'admin-form-row',
          'ui:title': 'Severity',
        },
        comprison_type: {
          'ui:classNames': 'admin-form-row',
          'ui:title': 'Comprison type',
        },
        threshold: {
          'ui:classNames': 'admin-form-row log-search',
          'ui:title': 'Threshold',
          items: {
            metric: {
              'ui:classNames': 'admin-form-row',
              'ui:title': 'Metric',
            },
            comparison_type: {
              'ui:classNames': 'admin-form-row',
              'ui:title': 'Comparison type',
            },
            value: {
              'ui:classNames': 'admin-form-row',
              'ui:title': 'Value',
            },
          },
        },
      },
    },
  },
};

export const uiSchemaViewOnly: UiSchema = {
  customer: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Customer',
    'ui:readonly': true,
  },
  target: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Target',
    'ui:placeholder': 'Select target from list',
    'ui:readonly': true,
  },
  api_url: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'API Url',
    'ui:placeholder': 'Enter API Url',
    'ui:readonly': true,
  },
  secret_id: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Secret Id',
    'ui:placeholder': 'Enter Secret Id',
    'ui:readonly': true,
  },
  bucket_name: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Bucket name',
    'ui:placeholder': 'Enter Bucket name',
    'ui:readonly': true,
  },
  bucket_region: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Bucket region',
    'ui:readonly': true,
  },
  schedule: {
    'ui:classNames': 'admin-form-row ',
    'ui:placeholder': 'Select schedule from list',
    'ui:title': 'Schedule',
    'ui:readonly': true,
  },
  log_search: {
    'ui:classNames': 'admin-form-row log-search',
    'ui:title': 'Log search',
    'ui:readonly': true,
    url: {
      'ui:classNames': 'admin-form-row',
      'ui:title': 'Url',
    },
    parameter: {
      'ui:classNames': 'admin-form-row',
      'ui:title': 'Parameter',
    },
  },
  threshold_list: {
    'ui:classNames': 'admin-form-row log-search',
    'ui:title': 'Threshold list',
    'ui:readonly': true,
    items: {
      'ui:title': 'threshold',
      threshold_definition: {
        'ui:classNames': 'admin-form-row log-search',
        'ui:title': 'Threshold definition',
        name: {
          'ui:classNames': 'admin-form-row',
          'ui:title': 'Name',
        },
        severity: {
          'ui:classNames': 'admin-form-row',
          'ui:title': 'Severity',
        },
        comprison_type: {
          'ui:classNames': 'admin-form-row',
          'ui:title': 'Comprison type',
        },
        threshold: {
          'ui:classNames': 'admin-form-row log-search',
          'ui:title': 'Threshold',
          items: {
            metric: {
              'ui:classNames': 'admin-form-row',
              'ui:title': 'Metric',
            },
            comparison_type: {
              'ui:classNames': 'admin-form-row',
              'ui:title': 'Comparison type',
            },
            value: {
              'ui:classNames': 'admin-form-row',
              'ui:title': 'Value',
            },
          },
        },
      },
    },
  },
  'ui:submitButtonOptions': {
    norender: true,
  },
};

export const uiSchemaEdit: UiSchema = {
  customer: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Customer',
    'ui:readonly': true,
  },
  target: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Target',
    'ui:placeholder': 'Select target from list',
    'ui:widget': 'select',
  },
  api_url: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'API Url',
    'ui:placeholder': 'Enter API Url',
  },
  secret_id: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Secret Id',
    'ui:placeholder': 'Enter Secret Id',
  },
  bucket_name: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Bucket name',
    'ui:placeholder': 'Enter Bucket name',
  },
  bucket_region: {
    'ui:classNames': 'admin-form-row',
    'ui:title': 'Bucket region',
    'ui:readonly': false,
  },
  schedule: {
    'ui:classNames': 'admin-form-row ',
    'ui:placeholder': 'Select schedule from list',
    'ui:title': 'Schedule',
  },
  log_search: {
    'ui:classNames': 'admin-form-row log-search',
    'ui:title': 'Log search',
    url: {
      'ui:classNames': 'admin-form-row',
      'ui:title': 'Url',
    },
    parameter: {
      'ui:classNames': 'admin-form-row',
      'ui:title': 'Parameter',
    },
  },

  threshold_list: {
    'ui:classNames': 'admin-form-row log-search',
    'ui:title': 'Threshold list',
    items: {
      'ui:title': 'threshold',
      threshold_definition: {
        'ui:classNames': 'admin-form-row log-search',
        'ui:title': 'Threshold definition',
        name: {
          'ui:classNames': 'admin-form-row',
          'ui:title': 'Name',
        },
        severity: {
          'ui:classNames': 'admin-form-row',
          'ui:title': 'Severity',
        },
        comprison_type: {
          'ui:classNames': 'admin-form-row',
          'ui:title': 'Comprison type',
        },
        threshold: {
          'ui:classNames': 'admin-form-row log-search',
          'ui:title': 'Threshold',
          items: {
            metric: {
              'ui:classNames': 'admin-form-row',
              'ui:title': 'Metric',
            },
            comparison_type: {
              'ui:classNames': 'admin-form-row',
              'ui:title': 'Comparison type',
            },
            value: {
              'ui:classNames': 'admin-form-row',
              'ui:title': 'Value',
            },
          },
        },
      },
    },
  },
};
