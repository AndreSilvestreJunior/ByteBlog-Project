import { SessionContract } from '@ioc:Adonis/Addons/Session'

export default class ToastService {
  public success(session: SessionContract, message: string, time: number) {
    this.showToast(session, 'success', message, time, 'check', 'green')
  }

  public error(session: SessionContract, message: string, time: number) {
    this.showToast(session, 'error', message, time, 'x', 'red')
  }

  public warn(session: SessionContract, message: string, time: number) {
    this.showToast(session, 'warn', message, time, 'exclamation', 'yellow')
  }

  public info(session: SessionContract, message: string, time: number) {
    this.showToast(session, 'info', message, time, 'info', 'blue')
  }

  private showToast(
    session: SessionContract,
    type: 'success' | 'error' | 'warn' | 'info',
    message: string,
    time: number,
    icon: string,
    color: string
  ) {
    const notification = { type, message, time, icon, color }
    session.flash('notification', notification)
  }
}
