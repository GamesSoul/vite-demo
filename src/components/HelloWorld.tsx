import type { FormInstance } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import styles from './index.module.scss'

export default defineComponent({
  name: 'HelloWorld',
  setup () {
    const formRef = ref<FormInstance>()

    const numberValidateForm = reactive({
      age: 2
    })

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      console.log('reset!')
      formEl.resetFields()
    }

    return () => (
      <ElForm
        ref={formRef}
        model={numberValidateForm}
        label-width="100px"
        class="demo-ruleForm"
      >
        <span class={styles.test}>abc</span>
        <ElFormItem
          label="age"
          prop="age"
          rules={[
            { required: true, message: 'age is required' },
            { type: 'number', message: 'age must be a number' }
          ]}
        >
          <ElInput
            v-model:number={numberValidateForm.age}
            type="text"
            autocomplete="off"
          />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" onClick={() => submitForm(formRef.value)}>Submit</ElButton>
          <ElButton onClick={() => resetForm(formRef.value)}>Reset</ElButton>
        </ElFormItem>
      </ElForm>
    )
  }
})
