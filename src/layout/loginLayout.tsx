import { defineComponent } from 'vue'
import { ElContainer, ElHeader, ElMain, ElFooter } from 'element-plus'
import Footer from './components/footer'
import styles from './layout.module.scss'

export default defineComponent(function LoginLayout () {
  return () => (
    <ElContainer class={styles['login-loyout-style']}>
      <ElHeader></ElHeader>
      <ElMain>
        <section class={styles['login-container']}>
          <router-view></router-view>
        </section>
      </ElMain>
      <ElFooter><Footer /></ElFooter>
    </ElContainer>
  )
})
