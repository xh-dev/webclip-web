import { PasswordFilterPipe } from './password-filter.pipe';

describe('PasswordFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
