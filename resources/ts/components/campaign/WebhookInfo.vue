<script setup lang="ts">
import { ref } from 'vue'

const webhookUrl = ref('https://api.intricare.com/webhooks/campaign/v1/abc-123-xyz')
const isCopied = ref(false)

const copyToClipboard = () => {
  navigator.clipboard.writeText(webhookUrl.value)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}
</script>

<template>
  <VCard variant="flat" class="pa-4 border">
    <VCardTitle class="px-0 pt-0 pb-4">
      Inbound Webhook
    </VCardTitle>
    <VCardText class="px-0">
      <div class="mb-6">
        <p class="text-body-2 mb-4">
          Use the following URL to send data from your external sources (Zapier, Make, etc.) to this campaign.
        </p>
        
        <VTextField
          :model-value="webhookUrl"
          readonly
          label="Webhook URL"
          placeholder="Webhook URL"
          persistent-placeholder
          class="webhook-input"
        >
          <template #append-inner>
            <VBtn
              size="small"
              :color="isCopied ? 'success' : 'primary'"
              variant="text"
              @click="copyToClipboard"
            >
              <VIcon :icon="isCopied ? 'mdi-check' : 'mdi-content-copy'" class="me-1" />
              {{ isCopied ? 'Copied' : 'Copy' }}
            </VBtn>
          </template>
        </VTextField>
      </div>
      
      <VDivider class="mb-6" />
      
      <div class="webhook-instructions">
        <div class="text-subtitle-2 font-weight-bold mb-2">How it works:</div>
        <ol class="ps-4 text-body-2 text-medium-emphasis">
          <li class="mb-2">Send a POST request to the URL above.</li>
          <li class="mb-2">Include a JSON body with prospect details.</li>
          <li>We will automatically map fields and add prospects to the campaign.</li>
        </ol>
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped>
.webhook-input :deep(.v-field__input) {
  font-family: monospace;
  font-size: 0.875rem;
}
</style>
