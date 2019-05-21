import React from 'react';
import {Link} from 'react-router-dom';
import Mask from './public/Mask Group.svg';
import style from './index.module.css';

export const ApplySuccess = React.memo(()=>(
  <div>
    <div className={style.titleWrapper}>
      <img className={style.imgTitle} src={Mask} alt="success" />
      <div className={style.content}>
        <p className={style.pTitle}>
          &nbsp;&nbsp;&nbsp;恭喜你！
        </p>
        <p className={style.pContent}>
          我们已经将您的简历发送给您投递的职位，恭喜您距离成功又近一步！
        </p>
        <div className={style.btnWrapper}>
          <button  className={style.subBtn}>
            <Link to={'/my/application'} style={{color:'#FFFFFF'}}>查看所有申请</Link>
          </button>
        </div>
      </div>
    </div>
    <div className={style.bestWrapper}>
      <div className="cell-wall">
        <div className="cell-membrane">
          <p>您可能感兴趣</p>
          {/*todo, 推荐卡片*/}
        </div>
      </div>
    </div>
    {setTimeout(()=>(
      alert('其实还没有成功啦~')
    ), 3000)}
  </div>
));
ApplySuccess.displayName = 'ApplySuccess';
