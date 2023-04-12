/* eslint-disable no-shadow */

'use client';

import validator from '@rjsf/validator-ajv8';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from '@rjsf/core';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSubmitButtonOptions,
  SubmitButtonProps,
  IconButtonProps,
} from '@rjsf/utils';
import {
  faPlusCircle,
  faChevronUp,
  faChevronDown,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  TOUCHSTREAM_API_URL,
  uiSchemaAdmin,
  uiSchemaEdit,
  uiSchemaViewOnly,
  schemaEditAndView,
  schemaAdmin,
} from '../../../data/constants';
import { ISPConfig } from '../../../types';

// https://rjsf-team.github.io/react-jsonschema-form/docs/quickstart

function RemoveButton(props: IconButtonProps) {
  const { ...btnProps } = props;
  return (
    <button
      type="submit"
      className="btn btn-outline-danger btn-md ms-2 rounded-2"
      {...btnProps}
    >
      <FontAwesomeIcon icon={faTrashAlt} className="mx-2" />
      Remove
    </button>
  );
}

function AddButton(props: IconButtonProps) {
  const { ...btnProps } = props;
  return (
    <button
      type="submit"
      className="p-2 mx-2 mt-2 text-white rounded rounded-2 btn btn-lg justify-content-center"
      {...btnProps}
    >
      <FontAwesomeIcon icon={faPlusCircle} className="mx-2" />
      Add
    </button>
  );
}

function MoveDownButton(props: IconButtonProps) {
  const { ...btnProps } = props;
  return (
    <button
      type="submit"
      className="btn btn-outline-secondary btn-md ms-2 rounded-2"
      {...btnProps}
    >
      <FontAwesomeIcon icon={faChevronDown} className="mx-2" />
      Move Down
    </button>
  );
}

function SubmitButton(props: SubmitButtonProps) {
  const { uiSchema } = props;
  const { norender } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return (
    <button type="submit" className="px-4 py-3 text-white rounded ms-4 bg-button">
      Submit
    </button>
  );
}

function MoveUpButton(props: IconButtonProps) {
  const { ...btnProps } = props;
  return (
    <button
      type="submit"
      className="btn btn-outline-secondary btn-md ms-2 rounded-2"
      {...btnProps}
    >
      <FontAwesomeIcon icon={faChevronUp} className="mx-2" />
      Move Up
    </button>
  );
}

function notify(success: boolean, message: string) {
  return success
    ? toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
    })
    : toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
    });
}

function customValidate(formData: ISPConfig, errors: any) {
  if (formData.threshold_list && !formData.threshold_list.length) {
    errors.threshold_list.addError('Thresholds list should not be empty');
  }
  if (formData.queries && !formData.queries.length) {
    errors.queries.addError('Queries list should not be empty');
  }
  if (
    formData.log_search
    && (!formData.log_search.parameter || !formData.log_search.url)
  ) {
    errors.log_search.addError(
      'Log search parameter and url should not be empty',
    );
  }
  return errors;
}

export default function DynamicForm({
  access,
  customerName,
}: {
  access: string ;
  customerName: string;
}) {
  const [formData, setFormData] = useState<Partial<ISPConfig>>({});
  // This is to determine if the form is for a new entry or an existing one (POST vs PUT)
  const [isNewEntry, setIsNewEntry] = useState<boolean>(true);

  const templates = useMemo(
    () => ({
      ButtonTemplates: {
        SubmitButton,
        RemoveButton,
        MoveDownButton,
        MoveUpButton,
        AddButton,
      },
    }),
    [],
  );

  const queryClient = useQueryClient();

  const {
    data: configData,
    error: configError,
    isLoading: isConfigLoading,
  } = useQuery(
    ['config', customerName],
    () => fetch(`${TOUCHSTREAM_API_URL}config?customer=${customerName}`).then(
      (response) => response.json(),
    ),
    {
      enabled: !!customerName,
    },
  );

  function determineSchemaFromUserAccessLevel(access: string) {
    if (access === 'admin') {
      return uiSchemaAdmin;
    }
    if (access === 'edit') {
      return uiSchemaEdit;
    }
    if (access === 'view') {
      return uiSchemaViewOnly;
    }
    return uiSchemaViewOnly;
  }

  function showQueriesFieldFromUserAccessLevel(access: string) {
    if (access === 'admin') {
      return schemaAdmin;
    }
    return schemaEditAndView;
  }
  console.log('Config', configData);

  if (configError) {
    console.log('error', configError);
  }

  const { isLoading: isLoadingSubmit, mutate } = useMutation(
    async (data: ISPConfig) => {
      const requestOptions = {
        method: isNewEntry ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        `${TOUCHSTREAM_API_URL}config`,
        requestOptions,
      );
      const result = await response.json();
      return result;
    },
  );

  useEffect(() => {
    if (configData && configData.customer) {
      setIsNewEntry(false);
      setFormData(configData);
    } else {
      setIsNewEntry(true);
      setFormData({});
    }
  }, [configData]);

  function handleSubmit(formData: ISPConfig) {
    console.log({ formData });
    mutate(formData, {
      onSuccess: (data) => {
        notify(true, data.message);
        queryClient.setQueryData(['config', customerName], formData);
        // other options to update the cache
        // refetch();
        // queryClient.invalidateQueries(['config', customerName]);
      },
      onError: (error: any) => {
        console.log(error);
        notify(false, error?.message);
      },
    });
  }

  if (isConfigLoading || isLoadingSubmit) {
    // TODO : set a proper loader component
    return <div className="p-4 m-auto">Loading...</div>;
  }

  return (
    <Form
      schema={showQueriesFieldFromUserAccessLevel(access)}
      formData={{ ...formData, customer: customerName }}
      uiSchema={determineSchemaFromUserAccessLevel(access)}
      validator={validator}
      onSubmit={({ formData }) => handleSubmit(formData)}
      templates={{
        ...templates,
      }}
      onError={(e) => console.log(e)}
      customValidate={customValidate}
    />
  );
}
