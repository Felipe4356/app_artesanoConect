import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorUserPage } from './editor-user.page';

describe('EditorUserPage', () => {
  let component: EditorUserPage;
  let fixture: ComponentFixture<EditorUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
