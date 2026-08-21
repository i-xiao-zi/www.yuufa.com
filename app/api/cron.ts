import qs from "qs";


const fetcher = (uri: string, method: string = 'GET', data?: {[key: string]: any}) => {
  const headers = {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_TOKEN}`,
    'Content-Type': 'application/json',
  };
  return new Promise<any>(async (resolve, reject) => {
    const config = {
      method,
      headers,
    };
    if (data) {
      config['body'] = data;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_CRON_URL}${uri}`, config);
    if (response.ok) {
      const json = await response.json()
      resolve(json)
    }
    resolve({})
  })
}

namespace Cron {
  export interface Job {
      jobId: number;
      enabled: boolean;
      title: string;
      saveResponses: boolean;
      url: string;
      lastStatus: JobStatus;
      lastDuration: number;
      lastExecution: number;
      nextExecution: number | null;
      type: JobType;
      requestTimeout: number;
      redirectSuccess: boolean;
      folderId: number;
      schedule: JobSchedule;
      requestMethod: RequestMethod;
  }

  /**
   * Represents a cron job with detailed settings.
   */
  export interface DetailedJob extends Job {
      auth: JobAuth;
      notification: JobNotificationSettings;
      extendedData: JobExtendedData;
  }

  /**
   * Represents HTTP basic authentication settings for a job.
   */
  export interface JobAuth {
      enable: boolean;
      user: string;
      password: string;
  }

  /**
   * Specifies notification settings for a job.
   */
  export interface JobNotificationSettings {
      onFailure: boolean;
      onSuccess: boolean;
      onDisable: boolean;
  }

  /**
   * Holds extended request data for a job.
   */
  export interface JobExtendedData {
      headers: Record<string, string>;
      body: string;
  }

  /**
   * Represents the execution status of a job.
   */
  export enum JobStatus {
      Unknown = 0,
      OK = 1,
      FailedDNS = 2,
      FailedConnectHost = 3,
      FailedHTTP = 4,
      FailedTimeout = 5,
      FailedTooMuchResponseData = 6,
      FailedInvalidURL = 7,
      FailedInternalErrors = 8,
      FailedUnknownReason = 9,
  }

  /**
   * Represents the type of a job.
   */
  export enum JobType {
      Default = 0,
      Monitoring = 1,
  }

  /**
   * Represents the execution schedule of a job.
   */
  export interface JobSchedule {
      timezone: string;
      expiresAt: number;
      hours: number[];
      mdays: number[];
      minutes: number[];
      months: number[];
      wdays: number[];
  }

  /**
   * Represents the HTTP request method.
   */
  export enum RequestMethod {
      GET,
      POST,
      OPTIONS,
      HEAD,
      PUT,
      DELETE,
      TRACE,
      CONNECT,
      PATCH,
  }

  /**
   * Represents a job history log entry corresponding to one execution of the job.
   */
  export interface HistoryItem {
      jobId: number;
      identifier: string;
      date: number;
      datePlanned: number;
      jitter: number;
      url: string;
      duration: number;
      status: JobStatus;
      statusText: string;
      httpStatus: number;
      headers: string | null;
      body: string | null;
      stats: HistoryItemStats;
  }

  /**
   * Contains additional timing information for a job execution history item.
   */
  export interface HistoryItemStats {
      nameLookup: number;
      connect: number;
      appConnect: number;
      preTransfer: number;
      startTransfer: number;
      total: number;
  }
  export const list = (): Promise<{jobs: Job[], someFailed: boolean}> => fetcher('/jobs');
  export const get = (id: number): Promise<{ jobDetails: DetailedJob[] }> => fetcher(`/jobs/${id}`);
  export const put = () => fetcher(`/jobs`, 'PUT');
  export const history = (id: number): Promise<{history: HistoryItem[], predictions: number[]}> => fetcher(`/jobs/${id}/history`)
}

export default Cron;