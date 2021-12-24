import axios from 'axios'
import utils from '@/utils'

export default {
  getInstances({ filter }) {
    return axios.get(utils.createFilterURL(`/test_instance/`, filter))
  },

  getInstance({ instanceId }) {
    return axios.get(`/test_instance/${instanceId}/`)
  },

  getBuilds({ filter, instanceId }) {
    return axios.get(utils.createFilterURL(`/test_instance/${instanceId}/test_build/`, filter))
  },

  getBuild({ instanceId, buildId }) {
    return axios.get(`/test_instance/${instanceId}/test_build/${buildId}/`)
  },

  getSuites({ filter, instanceId, buildId }) {
    return axios.get(utils.createFilterURL(`/test_instance/${instanceId}/test_build/${buildId}/test_suite/`, filter))
  },

  getSuite({ instanceId, buildId, suiteId }) {
    return axios.get(`/test_instance/${instanceId}/test_build/${buildId}/test_suite/${suiteId}/`)
  },

  getCases({ filter, instanceId, buildId, suiteId }) {
    return axios.get(utils.createFilterURL(`/test_instance/${instanceId}/test_build/${buildId}/test_suite/${suiteId}/test_case/`, filter))
  },

  getCase({ instanceId, buildId, suiteId, caseId }) {
    return axios.get(`/test_instance/${instanceId}/test_build/${buildId}/test_suite/${suiteId}/test_case/${caseId}/`)
  },
}