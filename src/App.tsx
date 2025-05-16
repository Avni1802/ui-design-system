import './App.css';
import { Button } from './components/Button';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from './components/Link';
import { clsx } from 'clsx';

function App() {
    return (
        <>
            <div>
                {(['primary', 'secondary', 'tertiary'] as const).map(variant => (
                    <div className="p1 gap-2">
                        <Button variant={variant} label="Button CTA" />
                        <Button
                            variant={variant}
                            showLeading
                            iconLeading={<PlusOutlined />}
                            label="Button CTA"
                        />
                        <Button
                            variant={variant}
                            showTrailing
                            iconTrailing={<PlusOutlined />}
                            label="Button CTA"
                        />
                        <Button
                            variant={variant}
                            showLeading
                            iconLeading={<PlusOutlined />}
                            showTrailing
                            iconTrailing={<PlusOutlined />}
                            label="Button CTA"
                        />
                        <Button variant={variant} iconOnly icon={<PlusOutlined />} />
                        <Button disabled variant={variant} label="Button CTA" />
                    </div>
                ))}
            </div>
            <div>
                {(['primary', 'black', 'danger', 'success', 'warning', 'white'] as const).map(
                    variant => (
                        <div className={clsx('p1 gap-2', variant === 'white' && 'bg')}>
                            <Link color={variant} label="Link" />
                            <Link
                                color={variant}
                                showLeading
                                iconLeading={<PlusOutlined />}
                                showTrailing
                                iconTrailing={<PlusOutlined />}
                                label="Link"
                            />
                            <Link color={variant} iconOnly icon={<PlusOutlined />} />
                            <Link disabled color={variant} iconOnly icon={<PlusOutlined />} />
                        </div>
                    )
                )}
            </div>
        </>
    );
}

export default App;
