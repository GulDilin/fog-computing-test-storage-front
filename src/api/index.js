import axios from 'axios'
import utils from '@/utils'

export default {
  getInstances({ filter }) {
    return axios.get(utils.createFilterURL(`/test_instance/`, filter))
  },

  getBuilds({ filter, instanceId }) {
    return axios.get(utils.createFilterURL(`/test_instance/${instanceId}/test_build/`, filter))
  },

  getSuites({ filter, instanceId, buildId }) {
    return axios.get(utils.createFilterURL(`/test_instance/${instanceId}/test_build/${buildId}/test_suite/`, filter))
  },

  getCases({ filter, instanceId, buildId, suiteId }) {
    return axios.get(utils.createFilterURL(`/test_instance/${instanceId}/test_build/${buildId}/test_suite/${suiteId}/test_cases/`, filter))
  },
}