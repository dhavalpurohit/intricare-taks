import { ref, reactive } from 'vue'

export type ImportMethod = 'linkedin' | 'csv' | 'lookalike' | 'webhook'

export const useCampaignWizard = () => {
  const currentStep = ref(1)
  const selectedImportMethod = ref<ImportMethod | null>(null)
  
  // Step 1: Target Audience Data
  const linkedinUrl = ref('')
  const csvFile = ref<File | null>(null)
  const lookalikeList = ref<any[]>([])
  
  // Mapping State
  const mappingFields = reactive<Record<string, string>>({
    fullName: '',
    firstName: '',
    lastName: '',
    companyName: '',
    position: '',
    headline: '',
  })

  const resetMapping = () => {
    mappingFields.fullName = ''
    mappingFields.firstName = ''
    mappingFields.lastName = ''
    mappingFields.companyName = ''
    mappingFields.position = ''
    mappingFields.headline = ''
  }

  const nextStep = () => {
    currentStep.value++
  }

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  return {
    currentStep,
    selectedImportMethod,
    linkedinUrl,
    csvFile,
    lookalikeList,
    mappingFields,
    resetMapping,
    nextStep,
    prevStep,
  }
}
